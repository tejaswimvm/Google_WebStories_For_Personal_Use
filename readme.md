# 📖 Google Web Stories Editor (React + Vite)

A lightweight, open-source web-based **story editor** built with React and Vite. This tool allows users to visually create, edit, and preview AMP-compliant web stories with support for media uploads, templates, and story settings.

## 🚀 Features

- 🎨 Drag-and-drop visual story editing
- 📷 Media asset management
- 📄 Multi-page story builder
- ⚡ AMP-compliant output
- 🧩 Built with modern tech stack (React, Vite, SWC)

## 🌐 Live Hosting

Host your stories under `/webstories` route using [Vercel](https://google-web-stories-for-personal-use.vercel.app/webstories/editor.html#page=%2522914b2415-fbe8-4913-a568-2cdd4c4db17a%2522) or any static hosting provider.



## Steps to migrate the wp google pulgin
1. Copy the story editor wp package
2. comment meta boxes and publish as they require some wordpress pop boxes
3. change publish.jsx to have harcorded logos


these two are the config provided in editor

capabilities: {
hasUploadMediaAction: true,
canManageSettings: true,
},
