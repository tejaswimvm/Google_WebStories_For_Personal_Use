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
 * Internal dependencies
 */
import {
  addStoryToDB,
  deleteStoryInDB,
  getMediaFromDB,
  getStoriesInDB,
  updateStoryInDB,
} from "@utils/editor";
import { getStoryById } from "../editor";
import { createSolidFromString } from "@googleforcreators/patterns";
import { v4 as uuidv4 } from "uuid";
import apiFetch from "src/apiFetch";

export const fetchStories = async () => {
  const stories = await getStoriesInDB();
  const mediaFiles = await getMediaFromDB();
  const fetchedStoryIds = [];
  const treatedStories = stories.reduce((acc, story) => {
    // console.log("acc, story", acc, story, story?.meta?.web_stories_poster?.url);
    fetchedStoryIds.push(story.storyId);
    let mediaUrl = story?.meta?.web_stories_poster?.url;
    if (story?.featuredMedia?.id) {
      const fetchedMedia = mediaFiles?.find(
        (media) => media?.id === story?.featuredMedia?.id
      );
      mediaUrl = fetchedMedia?.src;
    }

    acc[story.storyId] = {
      author: story.author,
      capabilities: {
        hasEditAction: true,
        hasDeleteAction: true,
      },
      id: story.storyId,
      created: story?.created,
      createdGMT: story?.createdGMT,
      editStoryLink:
        window.location.origin + SUB_ROUTE + `/editor.html?id=${story.storyId}`,
      featuredMediaUrl: mediaUrl,
      modified: story?.modified,
      modifiedGMT: story?.modifiedGMT,
      status: story.status ? story.status : "publish",
      title: story?.title?.raw,
    };
    return acc;
  }, {});

  return {
    stories: treatedStories,
    fetchedStoryIds,
    totalPages: fetchedStoryIds.length === 0 ? 0 : 1,
    totalStoriesByStatus: {
      all: fetchedStoryIds.length,
      publish: fetchedStoryIds.length,
    },
  };
};

/**
 * Trash stories.
 *
 * @param {number|string} storyId Story Id.
 * @return {Promise} Request promise.
 */
export const trashStory = async (storyId) => {
  await deleteStoryInDB(storyId);
};

/**
 * Update story.
 *
 * @param {Object} story Story object.
 * @param story.id
 * @param story.author
 * @param story.title
 * @return {Promise} Request promise.
 */
export const updateStory = async ({ id, author, title }) => {
  if (!id) {
    return {};
  }
  const story = await getStoryById(id);
  if (author) {
    story.author = author;
  }
  if (title) {
    story.title = title;
  }
  await updateStoryInDB(story);
  return {
    author: story.author,
    capabilities: {
      hasEditAction: true,
      hasDeleteAction: true,
    },
    id: story.storyId,
    created: story?.created,
    createdGMT: story?.createdGMT,
    editStoryLink: SUB_ROUTE + `/editor.html?id=${story.storyId}`,
    featuredMediaUrl: story?.meta?.web_stories_poster?.url,
    modified: story?.modified,
    modifiedGMT: story?.modifiedGMT,
    status: story.status ? story.status : "publish",
    title: story?.title?.raw,
  };
};

/**
 * Create story from template
 *
 * @param {Object} config Configuration object.
 * @param {Object} template Template object.
 * @return {Promise} Request promise.
 */
export const createStoryFromTemplate = async (config, template) => {
  console.log("template", template);
  const { pages, version, colors } = template;
  const storyId = uuidv4();

  const story = {
    featuredMedia: {
      id: 0,
      url: "",
    },
    publisherLogo: {
      url: "",
      id: 1,
    },
    title: "",
  };

  const storyPropsToSave = {
    pages,
    featuredMedia: story.featuredMedia,
    title: story.title,
    status: "auto-draft",
    storyId,
    meta: {
      web_stories_publisher_logo: story.publisherLogo.id,
    },
  };

  const convertedColors = colors.map(({ color }) =>
    createSolidFromString(color)
  );

  // If available, take the global values.
  const {
    globalPageDuration = 7,
    globalAutoAdvance = true,
    globalStoryStyles,
  } = config;
  const storyData = {
    pages,
    version,
    autoAdvance: globalAutoAdvance,
    defaultPageDuration: globalPageDuration,
    currentStoryStyles: {
      colors: convertedColors,
    },
  };
  const finalStoryData = {
    ...storyPropsToSave,
    story_data: storyData,
  };

  const storySaveData = {
    storyId,
    title: {
      raw: "",
    },
    excerpt: {
      raw: "",
    },
    storyData: {
      version,
      pages,
      autoAdvance: globalAutoAdvance,
      defaultPageDuration: globalPageDuration,
      currentStoryStyles: {
        colors: convertedColors,
      },
    },
    author: {
      id: 1,
      name: "",
    },
    style_presets: globalStoryStyles,
    // content,
    permalinkTemplate:
      "https://storage.googleapis.com/apnakarobarindia.appspot.com/%pagename%/index.html",
    // featuredMedia: !featuredMedia.isExternal ? featuredMedia.id : null,
    // ...rest,
  };

  console.log("finalStoryData", storySaveData);
  await addStoryToDB(storySaveData);
  return {
    editLink: `/webstories/editor.html?id=${storyId}`,
  };
};
