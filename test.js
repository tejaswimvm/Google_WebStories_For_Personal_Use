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
import { DATA_VERSION } from "@googleforcreators/migration";

const storyTags = [
  {
    id: 1,
    link: "http://localhost:8899/web_story_tag/gold/pizza",
    name: "pizza",
    slug: "pizza",
    taxonomy: "web_story_tag",
  },
  {
    id: 2,
    link: "http://localhost:8899/web_story_tag/burger",
    name: "burger",
    slug: "burger",
    taxonomy: "web_story_tag",
  },
  {
    id: 3,
    link: "http://localhost:8899/web_story_tag/frenchFry",
    name: "frenchFry",
    slug: "frenchFry",
    taxonomy: "web_story_tag",
  },
];
const storyVerticals = [];
const storyColors = [];
const storyCategories = [
  {
    id: 11,
    link: "http://localhost:8899/web_story_category/booger",
    name: "Booger",
    slug: "booger",
    taxonomy: "web_story_category",
    parent: 0,
  },
  {
    id: 12,
    link: "http://localhost:8899/web_story_category/multiple-words",
    name: "Multiple words",
    slug: "multiple-words",
    taxonomy: "web_story_category",
    parent: 0,
  },
  {
    id: 13,
    link: "http://localhost:8899/web_story_category/gold",
    name: "gold",
    slug: "gold",
    taxonomy: "web_story_category",
    parent: 0,
  },
];

export default {
  title: { raw: "" },
  status: "draft",
  slug: "",
  date: "2020-05-06T22:32:37",
  dateGmt: "2020-05-06T22:32:37",
  modified: "2020-05-06T22:32:37",
  excerpt: { raw: "" },
  link: "http://stories.local/?post_type=web-story&p=1",
  previewLink: "http://stories.local/?post_type=web-story&p=1",
  storyData: {
    version: DATA_VERSION,
    pages: [],
  },
  permalinkTemplate: "http://stories3.local/stories/%pagename%/",
  stylePresets: { textStyles: [], colors: [] },
  password: "",
  author: { id: 1, name: "John Doe" },
  capabilities: {
    publish: true,
    "assign-author": true,
    "assign-web_story_tag": true,
    "create-web_story_tag": true,
    "assign-web_story_category": true,
    "create-web_story_category": true,
  },
  featuredMedia: {
    id: 0,
    height: 0,
    width: 0,
    url: "",
  },
  publisherLogo: {
    id: 0,
    height: 0,
    width: 0,
    url: "http://stories.local/wp-content/plugins/web-stories/assets/images/logo.png",
  },
  taxonomies: [
    {
      taxonomy: "web-story_tag",
      embeddable: true,
      href: "http://localhost:8899/wp-json/web-stories/v1/web_story_tag?post=1014",
    },
    {
      taxonomy: "web-story_category",
      embeddable: true,
      href: "http://localhost:8899/wp-json/web-stories/v1/web_story_category?post=1014",
    },
  ],
  terms: [...storyTags, ...storyColors, ...storyCategories, ...storyVerticals],
};

export const GET_MEDIA_RESPONSE_HEADER = {
  "X-WP-Total": 1,
  "X-WP-TotalPages": 1,
};

export const GET_MEDIA_RESPONSE_BODY = [
  {
    id: 274,
    date: "2020-09-01T05:33:54",
    date_gmt: "2020-09-01T05:33:54",
    guid: {
      rendered: "http://wp.local/wp-content/uploads/2020/09/IMAGE.jpg",
      raw: "http://wp.local/wp-content/uploads/2020/09/IMAGE.jpg",
    },
    modified: "2020-09-01T05:33:54",
    modified_gmt: "2020-09-01T05:33:54",
    slug: "IMAGE",
    status: "inherit",
    type: "attachment",
    link: "http://wp.local/IMAGE/",
    title: {
      raw: "IMAGE",
      rendered: "IMAGE",
    },
    author: { id: 1, name: "John Doe" },
    featured_media: 0,
    comment_status: "open",
    ping_status: "closed",
    template: "",
    meta: {
      web_stories_is_poster: false,
      web_stories_poster_id: 0,
    },
    web_stories_is_muted: false,
    web_story_media_source: [2],
    permalinkTemplate: "http://wp.local/?attachment_id=274",
    generated_slug: "IMAGE",
    web_stories_media_source: "editor",
    featured_media_src: [],
    description: {
      raw: "",
      rendered: '<p class="attachment">link</p>\n',
    },
    caption: { raw: "", rendered: "" },
    alt_text: "IMAGE",
    media_type: "image",
    mime_type: "image/jpeg",
    media_details: {
      width: 1080,
      height: 2220,
      file: "2020/09/IMAGE.jpg",
      sizes: {
        medium: {
          file: "IMAGE-146x300.jpg",
          width: 146,
          height: 300,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-146x300.jpg",
        },
        large: {
          file: "IMAGE-498x1024.jpg",
          width: 498,
          height: 1024,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-498x1024.jpg",
        },
        thumbnail: {
          file: "IMAGE-150x150.jpg",
          width: 150,
          height: 150,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-150x150.jpg",
        },
        medium_large: {
          file: "IMAGE-768x1579.jpg",
          width: 768,
          height: 1579,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-768x1579.jpg",
        },
        "1536x1536": {
          file: "IMAGE-747x1536.jpg",
          width: 747,
          height: 1536,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-747x1536.jpg",
        },
        "2048x2048": {
          file: "IMAGE-996x2048.jpg",
          width: 996,
          height: 2048,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-996x2048.jpg",
        },
        "web-stories-poster-portrait": {
          file: "IMAGE-640x853.jpg",
          width: 640,
          height: 853,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-640x853.jpg",
        },
        "web-stories-publisher-logo": {
          file: "IMAGE-96x96.jpg",
          width: 96,
          height: 96,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-96x96.jpg",
        },
        "web-stories-thumbnail": {
          file: "IMAGE-150x308.jpg",
          width: 150,
          height: 308,
          mime_type: "image/jpeg",
          source_url:
            "http://wp.local/wp-content/uploads/2020/09/IMAGE-150x308.jpg",
        },
        full: {
          file: "IMAGE.jpg",
          width: 1080,
          height: 2220,
          mime_type: "image/jpeg",
          source_url: "http://wp.local/wp-content/uploads/2020/09/IMAGE.jpg",
        },
      },
      image_meta: {
        aperture: "0",
        credit: "",
        camera: "",
        caption: "",
        created_timestamp: "0",
        copyright: "",
        focal_length: "0",
        iso: "0",
        shutter_speed: "0",
        title: "",
        orientation: "0",
        keywords: [],
      },
    },
    post: null,
    source_url: "http://wp.local/wp-content/uploads/2020/09/IMAGE.jpg",
    missing_image_sizes: [],
    _links: {
      self: [{ href: "http://wp.local/wp-json/web-stories/v1/media/274" }],
      collection: [{ href: "http://wp.local/wp-json/web-stories/v1/media" }],
      about: [{ href: "http://wp.local/wp-json/wp/v2/types/attachment" }],
      author: [
        { embeddable: true, href: "http://wp.local/wp-json/wp/v2/users/1" },
      ],
      replies: [
        {
          embeddable: true,
          href: "http://wp.local/wp-json/wp/v2/comments?post=274",
        },
      ],
      "wp:term": [
        {
          taxonomy: "web_story_media_source",
          embeddable: true,
          href: "http://wp.local/wp-json/wp/v2/web_story_media_source?post=274",
        },
      ],
      "wp:action-unfiltered-html": [
        { href: "http://wp.local/wp-json/web-stories/v1/media/274" },
      ],
      "wp:action-assign-author": [
        { href: "http://wp.local/wp-json/web-stories/v1/media/274" },
      ],
      "wp:action-create-web_story_media_source": [
        { href: "http://wp.local/wp-json/web-stories/v1/media/274" },
      ],
      "wp:action-assign-web_story_media_source": [
        { href: "http://wp.local/wp-json/web-stories/v1/media/274" },
      ],
      curies: [
        { name: "wp", href: "https://api.w.org/{rel}", templated: true },
      ],
    },
  },
];
