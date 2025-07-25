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
import { getTotalDuration } from '@googleforcreators/animation';
import { getLongestMediaElement } from '@googleforcreators/output/dist/utils/getLongestMediaElement';

function calculatePageLength({
  animations,
  defaultPageDuration = 7,
  elements,
  backgroundAudio,
}) {
  const { resource, loop } = backgroundAudio || {};

  const animationDuration = getTotalDuration({ animations }) / 1000;
  const backgroundAudioDuration =
    !loop && resource?.length ? resource.length : 0;

  // If we have media, take the media time for advancement time and ignore the default,
  // but still consider animation time as the minimum, too.
  const longestMediaElement = getLongestMediaElement(
    elements,
    Math.max(animationDuration || 1, backgroundAudioDuration)
  );
  if (longestMediaElement?.id) {
    return longestMediaElement?.resource?.length;
  }

  // If the page doesn't have media, take either the animations time or the configured default duration time.
  const nonMediaPageDuration = Math.max(
    animationDuration || 0,
    backgroundAudioDuration,
    defaultPageDuration
  );
  return nonMediaPageDuration > backgroundAudioDuration
    ? nonMediaPageDuration
    : backgroundAudioDuration;
}
function calculateStoryLength(pages, defaultPageDuration) {
  let storyLength = 0;
  pages.forEach((page) => {
    const { animations, elements, backgroundAudio } = page;
    storyLength =
      storyLength +
      calculatePageLength({
        animations,
        defaultPageDuration,
        elements,
        backgroundAudio,
      });
  });
  return storyLength;
}
export default calculateStoryLength;
