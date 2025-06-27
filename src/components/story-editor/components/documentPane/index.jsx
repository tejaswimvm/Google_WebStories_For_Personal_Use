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
import {
  ExcerptPanel,
  SlugPanel,
  PageAdvancementPanel,
  // BackgroundAudioPanel,
  TaxonomiesPanel,
  useStory,
  BackgroundAudioPanel,
  useConfig,
} from "@googleforcreators/story-editor";
import styled from "styled-components";

/**
 * Internal dependencies
 */
import PublishPanel from "./publish";
import StatusPanel from "./status";
// import { useCallback, useMemo } from "react";
// import { __, sprintf, translateToExclusiveList } from "@googleforcreators/i18n";
// import {
//   Button,
//   ButtonSize,
//   ButtonType,
//   ButtonVariant,
//   themeHelpers,
// } from "@googleforcreators/design-system";
// import { getExtensionsFromMimeType } from "@googleforcreators/media";
// const StyledButton = styled(Button)`
//   ${({ theme }) =>
//     themeHelpers.focusableOutlineCSS(
//       theme.colors.border.focus,
//       theme.colors.bg.secondary
//     )};
// `;

// const UploadButton = styled(StyledButton)`
//   padding: 12px 8px;
// `;

function DocumentPane() {
  const { backgroundAudio, updateStory } = useStory(
    ({
      state: {
        story: { backgroundAudio },
      },
      actions: { updateStory },
    }) => ({ backgroundAudio, updateStory })
  );
  console.log("backgroundAudio, updateStory", backgroundAudio, updateStory);
  // const {
  //   allowedMimeTypes: { audio: allowedAudioMimeTypes },
  //   capabilities: { hasUploadMediaAction },
  //   MediaUpload,
  // } = useConfig();
  // const allowedAudioFileTypes = useMemo(
  //   () =>
  //     allowedAudioMimeTypes
  //       .map((type) => getExtensionsFromMimeType(type))
  //       .flat(),
  //   [allowedAudioMimeTypes]
  // );

  // const updateBackgroundAudio = useCallback(
  //   (updatedBackgroundAudio) => {
  //     console.log("updateStory", updatedBackgroundAudio);
  //     updateStory({
  //       properties: { backgroundAudio: updatedBackgroundAudio },
  //     });
  //   },
  //   [updateStory]
  // );
  // const onSelect = useCallback(
  //   (media) => {
  //     console.log("onSelect", media);
  //     const updatedBackgroundAudio = {
  //       resource: {
  //         src: media.src,
  //         id: media.id,
  //         mimeType: media.mimeType,
  //         length: media.length,
  //         lengthFormatted: media.lengthFormatted,
  //       },
  //     };

  //     // if (showCaptions) {
  //     //   updatedBackgroundAudio.tracks = [];
  //     // }
  //     // if (showLoopControl) {
  //     //   updatedBackgroundAudio.loop = true;
  //     // }
  //     updateBackgroundAudio(updatedBackgroundAudio);
  //   },
  //   [updateBackgroundAudio]
  // );
  // const renderUploadButton = useCallback(
  //   (open) => (
  //     <UploadButton
  //       onClick={open}
  //       type={ButtonType.Secondary}
  //       size={ButtonSize.Small}
  //       variant={ButtonVariant.Rectangle}
  //     >
  //       {__("Upload an audio file", "web-stories")}
  //     </UploadButton>
  //   ),
  //   []
  // );
  // const onSelectErrorMessage = sprintf(
  //   /* translators: %s: list of allowed file types. */
  //   __("Please choose only %s to insert into page.", "web-stories"),
  //   translateToExclusiveList(allowedAudioFileTypes)
  // );
  const state = useStory(({ state }) => state);
  const actions = useStory(({ actions }) => actions);
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  // console.log("id", id);
  // console.log("backgroundAudio", backgroundAudio, state, actions);
  return (
    <>
      <StatusPanel />
      <PublishPanel />
      <ExcerptPanel />
      <SlugPanel />
      <PageAdvancementPanel />
      {/* <MediaUpload
        onSelect={(media) => {
          console.log("media data", media);
          onSelect(media);
        }}
        onSelectErrorMessage={onSelectErrorMessage}
        type={allowedAudioMimeTypes}
        title={__("Upload an audio file", "web-stories")}
        buttonInsertText={__("Select audio file", "web-stories")}
        render={renderUploadButton}
      /> */}
      <BackgroundAudioPanel />
      <TaxonomiesPanel />
    </>
  );
}

// Panels require a name override to have their own local storage set for panel collapse
export function PublishModalDocumentPane() {
  const { backgroundAudio, updateStory } = useStory(
    ({
      state: {
        story: { backgroundAudio },
      },
      actions: { updateStory },
    }) => ({ backgroundAudio, updateStory })
  );
  console.log("backgroundAudio, updateStory", backgroundAudio, updateStory);
  return (
    <>
      <PublishPanel nameOverride="storyDetailsPublishing" />
      <SlugPanel nameOverride="storyDetailsExcerpt" />
      <PageAdvancementPanel nameOverride="storyDetailsPageAdvancement" />
      <BackgroundAudioPanel nameOverride="storyDetailsBackgroundAudio" />
      <TaxonomiesPanel nameOverride="storyDetailsTaxonomies" />
    </>
  );
}

// Isolated Status Panel should not collapse and
// should have its own name to prevent collapse
// based on other implementations that have default name

const IsolatedPanel = styled(StatusPanel)`
  padding: 4px 4px 8px;
`;

export function IsolatedStatusPanel() {
  return (
    <IsolatedPanel
      nameOverride="storyDetailsStatus"
      canCollapse={false}
      isPersistable={false}
      popupZIndex={11}
    />
  );
}

export default DocumentPane;
