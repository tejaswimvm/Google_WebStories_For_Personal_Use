import "src/init";

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

/**
 * Internal dependencies
 */
import registerServiceWorker from "../../serviceWorkerRegistration";
import CustomDashboardComponent from "../../components/story-dashboard";
import {
  StoryStatusProvider,
  useStoryStatus,
} from "@custom-components/storyStatus";
import useIndexedDBMedia from "@custom-components/IndexedDBMedia/useIndexedDBMedia";

registerServiceWorker();

const App = () => {
  useIndexedDBMedia();
  const { isInitializingIndexDB, isRefreshingMedia } = useStoryStatus(
    ({ state }) => ({
      isInitializingIndexDB: state.isInitializingIndexDB,
      isRefreshingMedia: state.isRefreshingMedia,
    })
  );
  return !isInitializingIndexDB && !isRefreshingMedia ? (
    <CustomDashboardComponent />
  ) : (
    <p>{"Please wait"}</p>
  );
};

export const DashboardPage = () => {
  return (
    <StoryStatusProvider>
      <App />
    </StoryStatusProvider>
  );
};
