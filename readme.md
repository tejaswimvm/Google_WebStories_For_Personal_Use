A lightweight, open-source web-based story editor built with React and Vite. This tool allows users to visually create, edit, and preview AMP-compliant web stories with support for media uploads, templates, and story settings. Designed for fast performance and smooth publishing workflows.

🔧 Features
🎨 Drag-and-drop visual story editing

📷 Media asset management

📄 Multi-page story builder

⚡ AMP-compliant output

🧩 Built with modern tech (React, Vite, SWC)

## Steps to migrate the wp google pulgin
1. Copy the story editor wp package
2. comment meta boxes and publish as they require some wordpress pop boxes
3. change publish.jsx to have harcorded logos


these two are the config provided in editor

capabilities: {
hasUploadMediaAction: true,
canManageSettings: true,
},
