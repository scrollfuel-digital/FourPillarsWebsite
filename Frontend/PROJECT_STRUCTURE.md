# Project Structure - 4 Pillars Realty

## Overview
This project follows React best practices with a clean, organized folder structure.

## Directory Structure

```
FourPillarProject-main/
├── public/                          # Static assets (images, videos, fonts)
│   ├── images/                      # All image files
│   │   ├── logo.png
│   │   ├── logo1.png
│   │   ├── heroimage.png
│   │   ├── project_*.png
│   │   └── ...
│   └── videos/                      # Video files
│       ├── fourPillarWebsiteVideo.mp4
│       └── PillarWebsiteVideo.mp4
│
├── src/
│   ├── components/                  # Reusable components
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                      # UI components
│   │   │   ├── LeadModal.tsx
│   │   │   ├── SearchOverlay.tsx
│   │   │   ├── RealTimeNotifications.tsx
│   │   │   └── ProjectCard.tsx
│   │   ├── InteractiveMap.tsx
│   │   └── Logo.tsx
│   │
│   ├── pages/                       # Page-level views
│   │   ├── HomeView.tsx
│   │   ├── AboutView.tsx
│   │   ├── BlogsView.tsx
│   │   ├── ContactView.tsx
│   │   ├── FaqView.tsx
│   │   └── ProjectDetailView.tsx
│   │
│   ├── hooks/                       # Custom React hooks (future)
│   │
│   ├── utils/                       # Utility functions (future)
│   │
│   ├── constants/                   # Constants and configurations
│   │   └── index.ts                 # Exports PROJECTS, BRAND_COLORS from data.ts
│   │
│   ├── App.tsx                      # Main app component with routing
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Global styles
│   ├── data.ts                      # Project data, blogs, FAQs
│   ├── types.ts                     # TypeScript type definitions
│   └── vite-env.d.ts               # Vite type declarations
│
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

## Key Changes

### 1. **Public Folder** (NEW)
- All static assets moved to `public/` folder
- Images accessible via `/images/filename.png`
- Videos accessible via `/videos/filename.mp4`
- No import statements needed, use direct paths in src

### 2. **Components Organization**
- **layout/**: Navigation and structural components (Navbar, Footer)
- **ui/**: Reusable UI components (Modals, Overlays, Cards)

### 3. **Pages**
- Contains full-page components
- Page-level view components

### 4. **Future-Ready Structure**
- **hooks/**: For custom React hooks
- **utils/**: For helper functions
- **constants/**: For app-wide constants

## Import Path Examples

### Before (Old Structure)
```tsx
import logo1 from '../assets/images/logo1.png';
import Navbar from './components/Navbar';
```

### After (New Structure)
```tsx
const logo1 = '/images/logo1.png';  // Direct public path
import Navbar from './components/layout/Navbar';
```

## Benefits

1. **Better Organization**: Clear separation of concerns
2. **Scalability**: Easy to add new features and components
3. **Performance**: Static assets in public folder are optimally served
4. **Standards**: Follows React community best practices
5. **Maintainability**: Easy to locate and modify files

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Notes

- All image paths in `data.ts` updated to use `/images/` prefix
- Layout components separated from UI components
- Ready for future expansion (hooks, utils, etc.)
