<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# 4 Pillars Realty - Modern React Application

This is a professional real estate web application built with React, TypeScript, and Vite.

View your app in AI Studio: https://ai.studio/apps/c88888db-6d99-4b04-8fc4-1a8b44456468

## 📁 Project Structure

```
FourPillarProject-main/
├── public/                    # Static assets
│   ├── images/               # All images (logos, projects, etc.)
│   └── videos/               # Video files
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── ui/              # UI components (Modals, Cards, etc.)
│   ├── pages/               # Page views (Home, About, Contact, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── constants/           # App constants
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   ├── data.ts              # Project data
│   └── types.ts             # TypeScript types
└── index.html               # HTML template
```

## 🚀 Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set the GEMINI_API_KEY:**
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key to `.env.local`

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Architecture

### Components Organization
- **layout/**: Structural components (Navbar, Footer)
- **ui/**: Reusable UI components (Modals, Overlays, Cards)

### Views
Modern React convention using views instead of pages for better semantic clarity.

### Public Assets
All static assets (images, videos) are in the `public/` folder and referenced directly:
```tsx
<img src="/images/logo.png" alt="Logo" />
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Motion** - Animations
- **Lucide React** - Icons

## 📝 Key Features

- Modern folder structure following React best practices
- Component-based architecture
- TypeScript for type safety
- Responsive design
- Animated UI with Framer Motion
- Clean separation of concerns

## 📚 Documentation

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed folder structure documentation.

## 🔧 Development

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Vite** for fast development and optimized builds

## 📄 License

© 2026 4 Pillars Realty (Nagpur). All rights reserved.
