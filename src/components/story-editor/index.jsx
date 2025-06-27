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
import { useEffect, useMemo, useState } from "@googleforcreators/react";
import { AutoSaveCheck, StoryEditor } from "@googleforcreators/story-editor";
import { elementTypes } from "@googleforcreators/element-library";
import { registerElementType } from "@googleforcreators/elements";
import { v4 as uuidv4 } from "uuid";

/**
 * Internal dependencies
 */
import {
  saveStoryById,
  getFonts,
  getMedia,
  updateMedia,
  deleteMedia,
  uploadMedia,
  getStoryById,
  getCurrentUser,
} from "../../api/editor";
import { useStoryStatus } from "../custom-components/storyStatus";
import { MENU_FOLDED_WIDTH, TIPS, TOOLBAR_HEIGHT } from "./constants";
import { updateSettings } from "@googleforcreators/date";
import "./setLocaleData";
import { GlobalStyle } from "./theme.jsx";
import {
  PostPublishDialog,
  PostReviewDialog,
  // StatusCheck,
  CorsCheck,
  RevisionMessage,
  FontCheck,
  // PostLock,
  Layout,
  CustomMediaUpload,
} from "./components";

const CreationTool = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log("id", id);
  const { isInitializingIndexDB } = useStoryStatus(({ state }) => ({
    isInitializingIndexDB: state.isInitializingIndexDB,
  }));

  const [story, setStory] = useState();
  useEffect(() => {
    console.log("changed triggered", story);
    getCurrentUser("lol");
  }, [story]);

  const config = useMemo(() => {
    return {
      storyId: id ? id : uuidv4(),
      capabilities: {
        hasUploadMediaAction: true,
        canManageSettings: true,
      },
      dashboardLink: "http://127.0.0.1:5173/webstories/dashboard.html",
      apiCallbacks: {
        updateCurrentUser: () => Promise.resolve({}),
        getFonts,
        saveStoryById,
        getMedia,
        uploadMedia,
        updateMedia,
        deleteMedia,
      },
      additionalTips: TIPS,
      MediaUpload: CustomMediaUpload,
      styleConstants: {
        topOffset: TOOLBAR_HEIGHT,
        leftOffset: MENU_FOLDED_WIDTH,
      },
    };
  }, [id]);
  updateSettings(config.locale);

  elementTypes.forEach(registerElementType);

  useEffect(() => {
    const hydrateStory = async () => {
      const s = id ? await getStoryById(id) : {};
      // updateStory
      console.log("sssssssss", s);
      setStory(s);
    };
    if (!isInitializingIndexDB) {
      hydrateStory();
    }
  }, [isInitializingIndexDB, id]);

  if (!story) {
    return <p>{"Please wait"}</p>;
  }
  console.log("stpry", { story });
  return (
    <>
      {console.log("config", config, story)}
      <StoryEditor config={config} initialEdits={{ story }} storyId={id}>
        <Layout />
        <GlobalStyle />
        <PostPublishDialog />
        <PostReviewDialog />
        {/* <StatusCheck /> */}
        <CorsCheck />
        <RevisionMessage />
        <FontCheck />
        <AutoSaveCheck />
        {/* <PostLock /> */}
      </StoryEditor>
    </>
  );
};

export default CreationTool;
