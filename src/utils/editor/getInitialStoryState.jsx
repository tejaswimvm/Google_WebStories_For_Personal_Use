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
import { migrate } from '@googleforcreators/migration';
// import { getUniquePresets } from '@googleforcreators/story-editor';
import { createPage } from '@googleforcreators/elements';

function getInitialStoryState() {
  const globalStoryStyles = {
    colors: [],
    textStyles: [],
  };

  // If there are no pages, create empty page.
  const storyData = migrate([], 0);
  const pages = storyData?.pages?.length > 0 ? storyData.pages : [createPage()];

  // Set story-global variables.
  const story = {
    title: '',
    storyId: 1,
    currentStoryStyles: {
      colors: storyData?.currentStoryStyles?.colors
        // ? getUniquePresets(storyData.currentStoryStyles.colors)
        ? storyData.currentStoryStyles.colors
        : [],
    },
    globalStoryStyles,
    autoAdvance: storyData?.autoAdvance,
    defaultPageDuration: storyData?.defaultPageDuration,
  };

  return {
    pages,
    story,
    selection: [],
    current: null, // will be set to first page by `restore`
  };
}

export default getInitialStoryState;
