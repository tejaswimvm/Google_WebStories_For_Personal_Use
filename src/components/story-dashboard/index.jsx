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
import { Dashboard } from "@googleforcreators/dashboard";

/**
 * Internal dependencies
 */
import {
  fetchStories,
  updateStory,
  trashStory,
  createStoryFromTemplate,
  getAuthors,
  getTaxonomies,
  getTaxonomyTerms,
} from "../../api/dashboard";
import { GlobalStyle } from "./theme";
import { useEffect } from "react";
import {
  LEFT_RAIL_SECONDARY_NAVIGATION,
  MENU_FOLDED_WIDTH,
  TOOLBAR_HEIGHT,
} from "./constants";
import { __ } from "@googleforcreators/i18n";
import { setAppElement } from "@googleforcreators/design-system";
import { updateSettings } from "./api/settings";
import { initializeTracking } from "@googleforcreators/tracking";
import * as apiCallbacks from "./api";
import bindToCallbacks from "@components/story-editor/wp-utils/bindToCallbacks";
import { Layout } from "./components";
import { getCurrentUser } from "@custom-api/dashboard/users";

const CustomDashboardComponent = (id = "web-stories-dashboard", config) => {
  const appElement = document.getElementById(id);
  // see http://reactcommunity.org/react-modal/accessibility/
  setAppElement(appElement);

  // updateSettings(config.locale);

  // Already tracking screen views in AppContent, no need to send page views as well.
  initializeTracking("Dashboard", false);
  const overWriteRoutes = {
    ...apiCallbacks,
    fetchStories,
    updateStory,
    trashStory,
    createStoryFromTemplate,
    getAuthors,
    getCurrentUser,
    getTaxonomies,
    getTaxonomyTerms,
  };
  const dashboardConfig = {
    ...config,
    apiCallbacks: bindToCallbacks(overWriteRoutes, config),
    newStoryURL: SUB_ROUTE + "/editor.html",
    leftRailSecondaryNavigation: LEFT_RAIL_SECONDARY_NAVIGATION,
    documentTitleSuffix: __("Web Stories \u2212 WordPress", "web-stories"),
    styleConstants: {
      topOffset: TOOLBAR_HEIGHT,
      leftOffset: MENU_FOLDED_WIDTH,
    },
    api: {
      taxonomies: "http://localhost:8000/v1/story/taxonomy",
    },
    containerId: "wpbody",
    canViewDefaultTemplates: true,
  };
  console.log("dashboardConfig", dashboardConfig);
  useEffect(() => {
    // Find all anchor tags with the specific class name
    setTimeout(() => {
      const links = document.querySelectorAll(
        '[data-testid="story-editor-grid-link"]'
      );
      links?.forEach((link) => {
        link?.setAttribute("target", "_blank");
      });
    }, 500);
  }, []);

  return (
    <Dashboard config={dashboardConfig}>
      <GlobalStyle />
      <Layout />
    </Dashboard>
  );
};

export default CustomDashboardComponent;
