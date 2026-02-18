# BrightTools

A Next.js website optimized for graphics-heavy and 3D content.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **Leva** - GUI controls for debugging 3D scenes

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   └── Scene3D.tsx      # 3D scene component
└── public/              # Static assets
```

## Features

- ✨ Interactive 3D scene with auto-rotating objects
- 🎨 Modern gradient design
- 📱 Responsive layout
- ⚡ Optimized for performance
- 🎮 OrbitControls for user interaction

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
