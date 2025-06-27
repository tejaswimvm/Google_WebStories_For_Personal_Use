import "/src/init";

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
import { render } from "@googleforcreators/react";
import styled from "styled-components";

/**
 * Internal dependencies
 */
import registerServiceWorker from "../../serviceWorkerRegistration";
import CreationTool from "@components/story-editor";
import {
  StoryStatusProvider,
  useStoryStatus,
} from "@custom-components/storyStatus";
import useIndexedDBMedia from "@custom-components/IndexedDBMedia/useIndexedDBMedia";

registerServiceWorker();

console.log("entered editor");

const AppContainer = styled.div`
  height: ${({ isMobile }) => {
    return isMobile ? window?.innerHeight + "px" : "100vh";
  }};
`;

const App = () => {
  useIndexedDBMedia();
  const { isInitializingIndexDB, isRefreshingMedia } = useStoryStatus(
    ({ state }) => ({
      isInitializingIndexDB: state.isInitializingIndexDB,
      isRefreshingMedia: state.isRefreshingMedia,
    })
  );

  return !isInitializingIndexDB && !isRefreshingMedia ? (
    <AppContainer
      // @ts-ignore
      isMobile={window.matchMedia("(max-width: 480px)").matches}
    >
      <CreationTool />
    </AppContainer>
  ) : (
    <p>{"Please wait"}</p>
  );
};

const initEditor = () => {
  render(
    <StoryStatusProvider>
      <App />
    </StoryStatusProvider>,
    document.getElementById("playground-root")
  );
};

if ("loading" === document.readyState) {
  document.addEventListener("DOMContentLoaded", initEditor);
} else {
  initEditor();
}
