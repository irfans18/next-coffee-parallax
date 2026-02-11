# Artcofie - High-End Coffee Experience

A premium, immersive e-commerce experience for **Artcofie's Aceh Gayo Arabica Coffee**. This project showcases a modern approach to web design, featuring **smooth parallax scrolling**, **canvas-based image sequence animation (scrollytelling)**, and a **fully responsive interface**.

Built with the latest web technologies to deliver a high-performance, visually stunning user experience.

<!-- ![Artcofie Banner](public/web-app-manifest-512x512.png) -->
<!-- _(Note: Replace with actual banner if available)_ -->

## 🌟 Key Features

- **Immersive Scrollytelling**: A high-fidelity 3D rotating bottle animation controlled by scroll position, rendered via HTML5 Canvas for optimal performance.
- **Parallax Effects**: Smooth, staggered entrance animations for text and UI elements using Framer Motion.
- **Responsive Design**: Fully optimized for all devices, from large desktop screens to mobile phones. Includes touch-friendly interactions and adaptive layouts.
- **Dynamic UI**:
  - Glassmorphism effects (backdrop blur).
  - Custom cursors and hover interactions.
  - Interactive quantity selectors and navigation pills.
- **Performance Focused**: Optimized asset loading (WebP support) and static export configuration.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Deployment**: Static Export (compatible with Vercel, Netlify, GitHub Pages, etc.)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 18.17 or later.
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/next-coffee-parallax.git
    cd next-coffee-parallax
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This project is configured for `output: 'export'` in `next.config.mjs`, meaning it will generate a static HTML export in the `out/` directory.

## 📂 Project Structure

```bash
.
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── layout.tsx      # Root layout including fonts and metadata
│   │   ├── page.tsx        # Main landing page (Scrollytelling & Details)
│   │   └── globals.css     # Global styles and Tailwind imports
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Top navigation bar
│   │   ├── Footer.tsx      # Site footer
│   │   ├── ProductBottleScroll.tsx # Core scrollytelling logic (Canvas)
│   │   └── ProductTextOverlays.tsx # Floating text overlays for the scroll section
│   ├── hooks/              # Custom React hooks
│   │   └── useScreenSize.ts # Hook for responsive logic
│   └── lib/                # Utilities and data
│       └── product.ts      # Product data and configuration
├── public/                 # Static assets
│   ├── images/             # Product images and sequences
│   └── fonts/              # Local fonts (if any)
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## 📦 Deployment

This project uses `next export` (via `output: 'export'`). You can deploy the `out/` folder to any static hosting service.

**Vercel / Netlify:**
Simply connect your repository. The build settings should automatically be detected (Framework: Next.js).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Created by rfms**
