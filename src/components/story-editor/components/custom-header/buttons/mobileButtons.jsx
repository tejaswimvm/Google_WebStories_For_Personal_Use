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
import {
  DropDown,
  Placement,
  useSnackbar,
} from "@googleforcreators/design-system";
import { saveAs } from "file-saver";
import { useCallback, useState } from "@googleforcreators/react";
import { __ } from "@googleforcreators/i18n";
import { useStory } from "@googleforcreators/story-editor";
import { css } from "styled-components";
import axios from "axios";

/**
 * Internal dependencies
 */
import calculateStoryLength from "./video-export/calculateStoryLength";
import doVideoExport from "./video-export/doVideoExport";
import { escapeHTML } from "@utils/editor";
const selectButtonCSS = css`
  height: 32px;
  span {
    padding: 0;
  }
  transform: scale(0.9) translate(0px, -2px);
  @media (min-width: 480px) {
    display: none;
  }
  margin-right: 20px;
`;

const ACTION_OPTIONS = [
  {
    label: __("Actions", "web-stories"),
    value: 1,
  },
  {
    label: __("Preview", "web-stories"),
    value: 2,
  },
  {
    label: __("Save", "web-stories"),
    value: 3,
  },
  {
    label: __("Export", "web-stories"),
    value: 4,
  },
];
const PREVIEW_TARGET = "story-preview";
function getPreviewLink() {
  return SUB_ROUTE + "/preview.html";
}
function MobileButtons() {
  const [selectedValue, setSelectedValue] = useState(1);
  const { saveStory, pages, defaultPageDuration, title, reducerState } =
    useStory(
      ({
        actions: { saveStory },
        state: {
          story: { defaultPageDuration, title },
          pages,
        },
        internal: { reducerState },
      }) => ({
        saveStory,
        pages,
        defaultPageDuration,
        title,
        reducerState,
      })
    );
  const { current, selection, story } = reducerState;
  const { showSnackbar } = useSnackbar();
  const handleActions = useCallback(
    async (_event, value) => {
      setSelectedValue(value);
      if (value === 2) {
        await saveStory();
        const playgroundPreviewLink = getPreviewLink();
        // Start a about:blank popup with waiting message until we complete
        // the saving operation. That way we will not bust the popup timeout.
        let popup;
        try {
          popup = window.open("about:blank", PREVIEW_TARGET);
          if (popup) {
            popup.document.write("<!DOCTYPE html><html><head>");
            popup.document.write("<title>");
            popup.document.write(
              escapeHTML(__("Generating the preview…", "web-stories"))
            );
            popup.document.write("</title>");
            popup.document.write("</head><body>");
            // Output "waiting" message.
            popup.document.write(
              escapeHTML(
                __("Please wait. Generating the preview…", "web-stories")
              )
            );
            const decoratedPreviewLink = playgroundPreviewLink;
            // Force redirect to the preview URL after 5 seconds. The saving tab
            // might get frozen by the browser.
            popup.document.write(
              `<script>
                 setTimeout(function() {
                   location.replace(${JSON.stringify(decoratedPreviewLink)});
                 }, 5000);
               </script>`
            );
          }
        } catch (e) {
          // Ignore errors. Anything can happen with a popup. The errors
          // will be resolved after the story is saved.
        }
      } else if (value === 3) {
        await saveStory();
        showSnackbar({
          message: "Story Saved",
          dismissable: true,
        });
      } else if (value === 4) {
        await saveStory();
        showSnackbar({
          message: "Generating video from markup.",
          dismissable: true,
        });
        const content = await doVideoExport({
          pages,
          current,
          selection,
          story,
        });
        const data = {
          story: btoa(encodeURIComponent(content)),
          timeout: calculateStoryLength(pages, defaultPageDuration),
        };
        axios({
          url: "https://record-ffmpeg.com/",
          method: "POST",
          data: data,
          responseType: "blob",
        })
          .then((res) => {
            const file = window.URL.createObjectURL(new Blob([res.data]));
            saveAs(file, `${title ? title : "untitled"}.mp4`);
          })
          .catch(() => {
            showSnackbar({
              message: "Error in downloading",
              dismissable: true,
            });
          });
      }
    },
    [
      current,
      defaultPageDuration,
      pages,
      saveStory,
      selection,
      showSnackbar,
      story,
      title,
    ]
  );
  return (
    <DropDown
      ariaLabel={__("Story Actions", "web-stories")}
      placeholder={"Actions"}
      options={ACTION_OPTIONS}
      popupZIndex={window.matchMedia("(max-width:480px)").matches ? 12 : 2}
      placement={Placement.TopStart}
      onMenuItemClick={handleActions}
      selectedValue={selectedValue}
      popupFillWidth={false}
      selectButtonStylesOverride={selectButtonCSS}
    />
  );
}
export default MobileButtons;
