/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { DATA_VERSION } from "@googleforcreators/migration";
import { useSnackbar } from "@googleforcreators/design-system";
import { useStory, getStoryPropsToSave } from "@googleforcreators/story-editor";
import { OutputStory } from "@googleforcreators/output";
import { PAGE_RATIO, PAGE_WIDTH } from "@googleforcreators/units";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * Internal dependencies
 */
import { useStoryStatus } from "../storyStatus";
import { isBlobURL } from "@googleforcreators/media";
import { COMMON_MIME_TYPE_MAPPING } from "@utils/editor/consts";

function useExportStory() {
  const {
    internal: { reducerState },
  } = useStory();
  const { showSnackbar } = useSnackbar();
  const { pages, current, selection, story } = reducerState;

  const {
    actions: { updateIsExporting },
  } = useStoryStatus(({ actions }) => ({ actions }));

  const zipStory = async () => {
    const zip = new JSZip();

    const mediaTypes = ["image", "video"];

    const updatedPages = await Promise.all(
      pages.map(async (page) => {
        const currentPage = page ? JSON.parse(JSON.stringify(page)) : {};
        await Promise.all(
          currentPage.elements.map(async (element) => {
            const mediaType = element.type;

            if (!mediaTypes.includes(mediaType)) {
              return;
            }
            const { src, mimeType, poster, alt } = element.resource;
            const extension = COMMON_MIME_TYPE_MAPPING[mimeType];

            if (!extension) {
              return;
            }

            /**
             * Use double size image of the page ratio as unsplash image size can be very
             * large and we aren't using srcset to keep things simple for the user.
             */
            if (src.startsWith("https://images.unsplash.com")) {
              const resizedSrc = new URL(src);
              resizedSrc.searchParams.set(
                "w",
                encodeURIComponent(PAGE_WIDTH * 2)
              );
              resizedSrc.searchParams.set(
                "h",
                encodeURIComponent((PAGE_WIDTH * 2) / PAGE_RATIO)
              );
              return;
            }

            if (!isBlobURL(src)) {
              return;
            }

            const resp = await fetch(src);
            const respBlob = await resp.blob();
            const fileName = `${alt}.${extension}`;
            const file = new File([respBlob], fileName);

            let posterFileName;
            let posterFile;
            if (poster) {
              const posterResp = await fetch(poster);
              const posterRespBlob = await posterResp.blob();
              posterFileName = `${alt}-poster.jpeg`;
              posterFile = new File([posterRespBlob], posterFileName);
            }

            element.resource.src = fileName;

            if (posterFileName) {
              element.resource.poster = posterFileName;
            }

            zip.file(fileName, file);

            if (posterFileName && posterFile) {
              zip.file(posterFileName, posterFile);
            }
          })
        );
        return currentPage;
      })
    );

    const storyData = {
      current,
      selection,
      story: {
        globalStoryStyles: story?.globalStoryStyles,
        adOptions: story?.adOptions,
        title: story?.title,
      },
      version: DATA_VERSION,
      pages: updatedPages,
    };

    const markup = renderToStaticMarkup(
      <OutputStory
        story={storyData.story}
        pages={storyData.pages}
        metadata={{ publisher: "" }}
        flags={{ allowBlobs: true }}
      />
    );

    zip.file("config.json", JSON.stringify(storyData));

    const readMeText = `
   Uploading ad to google ad manager:
   1. Choose "Code Type" as "AMP", copy the entire content of index.html without formatting and paste it inside the "AMP HTML" textbox.
   2. Your local uploaded assets of the story ad have been downloaded as part of the zip and have a relative path in index.html, please upload those assets and change its file path by inserting macros. If you have used external assets, they would have direct external links in html. 
       `;

    zip.file("index.html", markup);
    zip.file("README.txt", readMeText);
    const zipName = story.title
      ? story.title.replace(/ +/g, "-").toLowerCase()
      : "web-story";
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, zipName + ".zip");
    });

    return zipName;
  };

  const exportStory = async () => {
    const storyProps = getStoryPropsToSave({
      story,
      pages,
      metadata: {},
      flags: {},
    });
    updateIsExporting(true);
    const zipName = await zipStory(storyProps.content);
    updateIsExporting(false);
    showSnackbar({
      message: zipName + " downloading...",
      dismissable: true,
    });
  };

  return {
    exportStory,
  };
}

export default useExportStory;
