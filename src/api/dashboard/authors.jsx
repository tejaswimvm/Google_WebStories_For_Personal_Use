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
 * WordPress dependencies
 */
/**
 * External dependencies
 */
import { addQueryArgs } from "@googleforcreators/url";
import apiFetch from "src/apiFetch";
import { extractResponseData } from "src/helper/commonHelper";

export async function getAuthors(search) {
  const response = await apiFetch.get(
    addQueryArgs("http://localhost:8000/v1/story/taxonomy", {
      per_page: "10",
      search,
    })
  );
  const authors = extractResponseData(response);
  return authors;
}
