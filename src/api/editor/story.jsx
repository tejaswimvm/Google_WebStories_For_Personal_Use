/*
 * Copyright 2021 Google LLC
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
import { DATA_VERSION } from "@googleforcreators/migration";
import { OutputStory } from "@googleforcreators/output";
/**
 * Internal dependencies
 */
import { renderToStaticMarkup } from "react-dom/server";
import {
  getStoryIdsInDB,
  updateStoryInDB,
  addStoryToDB,
  getStoryInDB,
  getFeaturedMediaUrl,
} from "@utils/editor";
import { LOCAL_STORAGE_PREVIEW_MARKUP_KEY } from "@utils/editor/consts";

export const saveStoryById = async ({
  pages,
  fonts,
  featuredMedia,
  globalStoryStyles,
  publisherLogo,
  autoAdvance,
  defaultPageDuration,
  currentStoryStyles,
  backgroundAudio,
  // content,
  author,
  products,
  title,
  excerpt,
  storyId,
  slug,
  date,
  modified,
  status,
  rest,
}) => {
  console.log("rest", rest);
  const storySaveData = {
    storyId,
    title: {
      raw: title,
    },
    excerpt: {
      raw: excerpt,
    },
    storyData: {
      version: DATA_VERSION,
      pages,
      fonts,
      autoAdvance,
      defaultPageDuration,
      currentStoryStyles,
      backgroundAudio,
    },
    author: author,
    style_presets: globalStoryStyles,
    // content,
    meta: {
      web_stories_publisher_logo: publisherLogo?.id,
      web_stories_products: products,
      web_stories_poster:
        // featuredMedia.isExternal ?
        featuredMedia
          ? {
              url: featuredMedia.url,
              width: featuredMedia.width,
              height: featuredMedia.height,
              needsProxy: featuredMedia.needsProxy,
            }
          : null,
      // : null,
    },
    permalinkTemplate:
      "https://storage.googleapis.com/apnakarobarindia.appspot.com/%pagename%/index.html",
    slug,
    date,
    modified,
    status,
    featuredMedia:
      featuredMedia && !featuredMedia.isExternal ? featuredMedia : null,
    // ...rest,
  };

  console.log("storySaveData", storySaveData);
  // save markup in local storage.
  window.localStorage.setItem(
    LOCAL_STORAGE_PREVIEW_MARKUP_KEY,
    renderToStaticMarkup(
      <OutputStory
        story={{
          featuredMedia,
          link: "",
          title,
          autoAdvance,
          defaultPageDuration,
          backgroundAudio,
          publisherLogo: "",
        }}
        pages={pages}
        metadata={{ publisher: "" }}
        flags={{ allowBlobs: true }}
      />
    )
  );

  //add or update story in indexedDB

  const storyIdsInDB = await getStoryIdsInDB();

  if (storyIdsInDB.includes(storyId)) {
    await updateStoryInDB(storySaveData);
  } else {
    await addStoryToDB(storySaveData);
  }

  return {};
};

export const getStoryById = async (id) => {
  const story = await getStoryInDB(id);
  if (story.featuredMedia?.id) {
    const newMediaSrc = await getFeaturedMediaUrl(story.featuredMedia?.id);
    story.featuredMedia.src = newMediaSrc;
    story.featuredMedia.url = newMediaSrc;
  }
  console.log("getting story from db", story);
  return story ? story : {};
};
export const getCurrentUser = async (id) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};
  console.log("user", user);
  return user ? user : {};
};
export const updateStory = async ({
  pages,
  fonts,
  featuredMedia,
  globalStoryStyles,
  publisherLogo,
  autoAdvance,
  defaultPageDuration,
  currentStoryStyles,
  backgroundAudio,
  // content,
  author,
  products,
  title,
  excerpt,
  storyId,
  slug,
  date,
  modified,
  status,
  ...rest
}) => {
  console.log("rest", rest);
  const storySaveData = {
    storyId,
    title: {
      raw: title,
    },
    excerpt: {
      raw: excerpt,
    },
    storyData: {
      version: DATA_VERSION,
      pages,
      fonts,
      autoAdvance,
      defaultPageDuration,
      currentStoryStyles,
      backgroundAudio,
    },
    author: author,
    style_presets: globalStoryStyles,
    // content,
    meta: {
      web_stories_publisher_logo: publisherLogo?.id,
      web_stories_products: products,
      web_stories_poster:
        // featuredMedia.isExternal ?
        featuredMedia
          ? {
              url: featuredMedia.url,
              width: featuredMedia.width,
              height: featuredMedia.height,
              needsProxy: featuredMedia.needsProxy,
            }
          : null,
      // : null,
    },
    permalinkTemplate:
      "https://storage.googleapis.com/apnakarobarindia.appspot.com/%pagename%/index.html",
    // featured_media: !featuredMedia.isExternal ? featuredMedia.id : null,
    slug,
    date,
    modified,
    status,
    featuredMedia:
      featuredMedia && !featuredMedia.isExternal ? featuredMedia : null,
    // ...rest,
  };

  console.log("updatedSaveData", storySaveData);
  // save markup in local storage.
  window.localStorage.setItem(
    LOCAL_STORAGE_PREVIEW_MARKUP_KEY,
    renderToStaticMarkup(
      <OutputStory
        story={{
          featuredMedia: "",
          link: "",
          title,
          autoAdvance,
          defaultPageDuration,
          backgroundAudio,
          publisherLogo: "",
        }}
        pages={pages}
        metadata={{ publisher: "" }}
        flags={{ allowBlobs: true }}
      />
    )
  );

  //add or update story in indexedDB

  const storyIdsInDB = await getStoryIdsInDB();

  if (storyIdsInDB.includes(storyId)) {
    await updateStoryInDB(storySaveData);
  } else {
    await addStoryToDB(storySaveData);
  }

  return {};
};
