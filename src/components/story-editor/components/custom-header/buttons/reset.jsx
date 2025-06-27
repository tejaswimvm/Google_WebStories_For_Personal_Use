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
import { __ } from "@googleforcreators/i18n";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "@googleforcreators/design-system";
import { useCallback } from "@googleforcreators/react";
import { useStory, useHistory, Tooltip } from "@googleforcreators/story-editor";
import styled from "styled-components";
/**
 * Internal dependencies
 */
import arrowCircle from "./inline-icons/arrow_circle.svg";
import { getInitialStoryState } from "@utils/editor";
import { LOCAL_STORAGE_CONTENT_KEY } from "@utils/editor/consts";
import { useStoryStatus } from "@custom-components/storyStatus";

const Space = styled.div`
  width: 8px;
`;
const ArrowCircle = styled.img`
  width: 32px;
  height: 32px;
  left: -1px;
  top: -1px;
  src: url("${arrowCircle}");
  background-size: 100%;
  /* The icon is black and we can't use color because it's not inline so invert it is */
  filter: invert(100%);
`;

const ButtonContainer = styled.div`
  transform: scale(0.9) translate(0px, -2px);
`;

function Reset() {
  const {
    internal: { restore },
  } = useStory();
  const {
    actions: { clearHistory },
  } = useHistory();
  const resetStory = useCallback(() => {
    if (
      !window.confirm(
        __("Are you sure you want to reset all changes?", "web-stories")
      )
    ) {
      return;
    }
    window.localStorage.removeItem(LOCAL_STORAGE_CONTENT_KEY);
    clearHistory();
    restore(getInitialStoryState());
  }, [restore, clearHistory]);

  const {
    state: { isImporting, isExporting },
  } = useStoryStatus(({ state }) => ({
    state,
  }));

  const label = __("Reset", "web-stories");

  return (
    <>
      <Space />
      <Tooltip title={label} hasTail>
        <ButtonContainer>
          <Button
            variant={ButtonVariant.Square}
            type={ButtonType.QUATERNARY}
            size={ButtonSize.Small}
            onClick={resetStory}
            disabled={isImporting || isExporting}
            aria-label={label}
          >
            <ArrowCircle
              src={arrowCircle}
              alt={__("Button to reset the editor.", "web-stories")}
            />
          </Button>
        </ButtonContainer>
      </Tooltip>
    </>
  );
}

export default Reset;
