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
import styled from "styled-components";
import PropTypes from "prop-types";
import { CircularProgress } from "@googleforcreators/design-system";

/**
 * Internal dependencies
 */
import Preview from "./preview";
import Export from "./export";
import Save from "./save";
import Import from "./import";
import Reset from "./reset";
import MobileButtons from "./mobileButtons";
import {
  useStory,
  RedoButton,
  PreviewButton,
  SwitchToDraftButton,
  UndoButton,
  UpdateButton,
  PublishButton,
} from "@googleforcreators/story-editor";
import useMetaBoxes from "../../metaBoxes/useMetaBoxes";
import { useStoryStatus } from "@custom-components/storyStatus";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 32px;
  @media (max-width: 480px) {
    display: none;
  }
`;
const ButtonList = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  align-items: center;
`;

const Space = styled.div`
  width: 8px;
`;

const Spinner = styled.div`
  position: absolute;
  top: 0;
`;

const IconWithSpinner = styled.div`
  position: relative;
`;

function Loading() {
  return (
    <Spinner>
      <CircularProgress size={32} />
    </Spinner>
  );
}
function DraftButtons({ forceIsSaving, hasUpdates }) {
  return (
    <>
      <UpdateButton hasUpdates={hasUpdates} forceIsSaving={forceIsSaving} />
      <PublishButton forceIsSaving={forceIsSaving} />
    </>
  );
}

DraftButtons.propTypes = {
  forceIsSaving: PropTypes.bool.isRequired,
  hasUpdates: PropTypes.bool.isRequired,
};

function PendingButtons({ forceIsSaving, hasUpdates, canPublish }) {
  return (
    <>
      <SwitchToDraftButton forceIsSaving={forceIsSaving} />
      {canPublish && (
        <UpdateButton hasUpdates={hasUpdates} forceIsSaving={forceIsSaving} />
      )}
      <PublishButton forceIsSaving={forceIsSaving} />
    </>
  );
}

PendingButtons.propTypes = {
  forceIsSaving: PropTypes.bool.isRequired,
  hasUpdates: PropTypes.bool.isRequired,
  canPublish: PropTypes.bool.isRequired,
};

function PublishedButtons({ forceIsSaving, hasUpdates }) {
  return (
    <>
      <SwitchToDraftButton forceIsSaving={forceIsSaving} />
      <UpdateButton hasUpdates={hasUpdates} forceIsSaving={forceIsSaving} />
    </>
  );
}

PublishedButtons.propTypes = {
  forceIsSaving: PropTypes.bool.isRequired,
  hasUpdates: PropTypes.bool.isRequired,
};

function Buttons() {
  const { status, canPublish, isSaving } = useStory(
    ({
      state: {
        story: { status },
        meta: { isSaving },
        capabilities,
      },
    }) => ({
      status,
      isSaving,
      canPublish: Boolean(capabilities?.publish),
    })
  );

  const {
    state: { isImporting, isExporting },
  } = useStoryStatus(({ state }) => ({ state }));
  const isPending = "pending" === status;
  const isDraft = ["draft", "auto-draft"].includes(status) || !status;
  const isDraftOrPending = isDraft || isPending;
  const { hasMetaBoxes, isSavingMetaBoxes } = useMetaBoxes(
    ({ state: { hasMetaBoxes, isSavingMetaBoxes } }) => ({
      hasMetaBoxes,
      isSavingMetaBoxes,
    })
  );

  return (
    <ButtonList>
      <List>
        <Reset />
        <UndoButton />
        <RedoButton />
        <Wrapper>
          <Space />
          <Import />
          <Space />
          <Export />
          <Space />
          <Save />
          <Space />
          <IconWithSpinner>
            <Preview />
            {(isSaving || isImporting || isExporting) && <Loading />}
          </IconWithSpinner>
          {isDraft && (
            <DraftButtons
              forceIsSaving={isSavingMetaBoxes}
              hasUpdates={hasMetaBoxes}
            />
          )}
          {isPending && (
            <PendingButtons
              forceIsSaving={isSavingMetaBoxes}
              hasUpdates={hasMetaBoxes}
              canPublish={canPublish}
            />
          )}
          {!isDraftOrPending && (
            <PublishedButtons
              forceIsSaving={isSavingMetaBoxes}
              hasUpdates={hasMetaBoxes}
            />
          )}
        </Wrapper>
        <MobileButtons />
      </List>
    </ButtonList>
  );
}

export { Buttons };
