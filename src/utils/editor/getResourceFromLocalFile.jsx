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
// import { snakeToCamelCaseObjectKeys } from "@/components/story-editor/wp-utils/snakeToCamelCase";
import {
  createBlob,
  getTypeFromMime,
  getResourceSize,
  createResource,
  getFileBasename,
  getImageDimensions,
  getFirstFrameOfVideo,
} from "@googleforcreators/media";

/**
 * Create a local resource object.
 *
 * @param {Object} properties The resource properties.
 * @return {import('./createResource').Resource} The local resource object.
 */
const createLocalResource = (properties) => {
  return createResource({ ...properties, local: true });
};

/**
 * Creates the File Reader object.
 *
 * @param {File} file The File object from the DataTransfer API.
 * @return {Promise<FileReader>} The promise of the FileReader object.
 */
const createFileReader = (file) => {
  const reader = new window.FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Generates a image resource object from a local File object.
 *
 * @param {File} file File object.
 * @return {Promise<import('./createResource').Resource>} Local image resource object.
 */
const getImageResource = async (file) => {
  const fileName = getFileBasename(file);
  const mimeType = file.type;

  const reader = await createFileReader(file);

  const src = createBlob(new window.Blob([reader.result], { type: mimeType }));
  const { width, height } = await getImageDimensions(src);

  return createLocalResource({
    type: "image",
    mimeType,
    src,
    ...getResourceSize({ width, height }),
    alt: fileName,
    title: fileName,
  });
};

/**
 * Generates a video resource object from a local File object.
 *
 * @param {File} file File object.
 * @return {Promise<import('./createResource').Resource>} Local video resource object.
 */
const getVideoResource = async (file) => {
  const fileName = getFileBasename(file);
  const mimeType = file.type;

  let length = 0;
  let lengthFormatted = "";

  const reader = await createFileReader(file);

  const src = createBlob(new Blob([reader.result], { type: mimeType }));

  const videoEl = document.createElement("video");
  const canPlayVideo = "" !== videoEl.canPlayType(mimeType);
  if (canPlayVideo) {
    videoEl.src = src;
    videoEl.addEventListener("loadedmetadata", () => {
      length = Math.round(videoEl.duration);
      const seconds = formatDuration(length % 60);
      let minutes = Math.floor(length / 60);
      const hours = Math.floor(minutes / 60);

      if (hours) {
        minutes = formatDuration(minutes % 60);
        lengthFormatted = `${hours}:${minutes}:${seconds}`;
      } else {
        lengthFormatted = `${minutes}:${seconds}`;
      }
    });
  }
  const posterFile = await getFirstFrameOfVideo(src);
  const poster = createBlob(posterFile);
  const { width, height } = await getImageDimensions(poster);

  const resource = createLocalResource({
    type: "video",
    mimeType,
    src: canPlayVideo ? src : "",
    ...getResourceSize({ width, height }),
    poster,
    length,
    lengthFormatted,
    alt: fileName,
    title: fileName,
  });

  return { resource, posterFile };
};

/**
 * Generates a audio resource object from a local File object.
 *
 * @param {File} file File object.
 * @return {Promise<import('./createResource').Resource>} Local audio resource object.
 */
const getAudioResource = async (file) => {
  const fileName = getFileBasename(file);
  const mimeType = file.type;

  let length = 0;
  let lengthFormatted = "";

  const reader = await createFileReader(file);

  const src = createBlob(new Blob([reader.result], { type: mimeType }));

  const audioEl = document.createElement("audio");
  const canPlayAudio = "" !== audioEl.canPlayType(mimeType);
  if (canPlayAudio) {
    audioEl.src = src;
    audioEl.addEventListener("loadedmetadata", () => {
      length = Math.round(audioEl.duration);
      const seconds = formatDuration(length % 60);
      let minutes = Math.floor(length / 60);
      const hours = Math.floor(minutes / 60);

      if (hours) {
        minutes = formatDuration(minutes % 60);
        lengthFormatted = `${hours}:${minutes}:${seconds}`;
      } else {
        lengthFormatted = `${minutes}:${seconds}`;
      }
    });
  }

  const resource = createLocalResource({
    type: "audio",
    mimeType,
    src: canPlayAudio ? src : "",
    ...getResourceSize({ width: 72, height: 72 }),
    length,
    lengthFormatted,
    alt: fileName,
    title: fileName,
  });

  return { resource };
};
//"https://cdn-icons-png.flaticon.com/128/59/59284.png"

const formatDuration = (time) => {
  return time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const createPlaceholderResource = (properties) => {
  return createLocalResource({ ...properties, isPlaceholder: true });
};

const getPlaceholderResource = (file) => {
  const fileName = getFileBasename(file);
  const type = getTypeFromMime(file.type);
  const mimeType =
    type === "image"
      ? "image/png"
      : type === "video"
      ? "video/mp4"
      : "audio/mpeg";

  // The media library requires resources with valid mimeType and dimensions.
  return createPlaceholderResource({
    type: type || "image",
    mimeType: mimeType,
    src: "",
    ...getResourceSize({}),
    alt: fileName,
    title: fileName,
  });
};

/**
 * Generates a resource object from a local File object.
 *
 * @param {File} file File object.
 * @return {Promise<Object<{resource: import('./createResource').Resource, posterFile: File}>>} Object containing resource object and poster file.
 */
const getResourceFromLocalFile = async (file) => {
  const type = getTypeFromMime(file.type);

  let resource = getPlaceholderResource(file);
  let posterFile = null;

  try {
    if ("image" === type) {
      resource = await getImageResource(file);
    }

    if ("video" === type) {
      const results = await getVideoResource(file);
      resource = results.resource;
      posterFile = results.posterFile;
    }
    if ("audio" === type) {
      const results = await getAudioResource(file);
      resource = results.resource;
    }
  } catch (err) {
    console.log("error while creating local cache", err);
    // Not interested in the error here.
  }

  return { resource, posterFile };
};

export { getResourceFromLocalFile };

/*
 * Copyright 2020 Google LLC
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

/**
 * Generates a resource object from a WordPress media picker object.
 *
 * @param {Object} mediaPickerEl WP Media Picker object.
 * @return {import('@googleforcreators/media').Resource} Resource object.
 */
// const getResourceFromMediaPicker = (mediaPickerEl) => {
//   const {
//     src,
//     url,
//     mime: mimeType,
//     alt,
//     date,
//     id,
//     featured_media: posterId,
//     featured_media_src: {
//       src: poster,
//       width: posterWidth,
//       height: posterHeight,
//       generated: posterGenerated,
//     } = "",
//     media_details: {
//       width,
//       height,
//       length,
//       length_formatted: lengthFormatted,
//       sizes: _sizes = {},
//     } = {},
//     web_stories_media_source: mediaSource,
//     web_stories_is_muted: isMuted,
//     web_stories_base_color: baseColor,
//     web_stories_blurhash: blurHash,
//     trim_data: trimData,
//   } = mediaPickerEl;

//   const sizes = Object.entries(_sizes).reduce((sizes, [key, value]) => {
//     sizes[key] = snakeToCamelCaseObjectKeys(value);
//     return sizes;
//   }, {});

//   return createResource({
//     baseColor,
//     blurHash,
//     mimeType,
//     creationDate: date,
//     src: url || src,
//     ...getResourceSize({
//       width,
//       height,
//       posterGenerated,
//       posterWidth,
//       posterHeight,
//     }),
//     poster,
//     posterId,
//     id,
//     length,
//     lengthFormatted,
//     alt,
//     sizes,
//     local: false,
//     isExternal: false,
//     isOptimized: ["video-optimization", "recording"].includes(mediaSource),
//     isMuted,
//     trimData,
//   });
// };

// export default getResourceFromMediaPicker;
