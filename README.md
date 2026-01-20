# Code Assurance - Premium Landing Page

A high-end, scroll-driven landing page showcasing Code Assurance's engineering excellence and quality obsession. Built for enterprise tech companies, CTOs, and engineering leaders.

## ✨ Features

- **Immersive Scroll Experience** - Cinematic storytelling with GSAP ScrollTrigger
- **Smooth Scrolling** - Lenis for buttery-smooth scroll behavior
- **3D Visuals** - Abstract Three.js mesh animations
- **Premium Design** - Dark, high-contrast UI with bold typography
- **Micro-interactions** - Framer Motion for subtle animations
- **Performance** - Optimized for desktop-first experience

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP + ScrollTrigger** - Advanced scroll animations
- **Framer Motion** - UI micro-interactions
- **Three.js** - 3D graphics
- **@react-three/fiber & @react-three/drei** - React 3D rendering
- **Lenis** - Smooth scrolling library

## 📦 Installation

```bash
npm install
```

## 🎯 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 🏗️ Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Main landing page
└── globals.css         # Global styles and animations

components/
├── sections/
│   ├── Preloader.tsx       # System initialization loader
│   ├── Hero.tsx            # Hero section with 3D mesh
│   ├── Problem.tsx         # Problem visualization (chaos)
│   ├── Transition.tsx      # Chaos to control transition
│   ├── Process.tsx         # QA process steps
│   ├── Services.tsx        # Service cards
│   ├── Differentiators.tsx # Key differentiators
│   └── FinalCTA.tsx        # Call to action
├── three/
│   └── AbstractMesh.tsx    # 3D animated sphere
└── ui/                     # Reusable UI components

hooks/
└── useLenis.ts        # Smooth scrolling hook

lib/
└── utils.ts           # Utility functions
```

## 🎨 Design Principles

- **Dark, high-contrast UI** - Black background with accent green (#00ff88)
- **Bold typography** - Large, impactful headlines
- **Minimal copy** - Strong, concise statements
- **Scroll-driven storytelling** - Each section reveals on scroll
- **Cinematic pacing** - Carefully timed animations
- **Enterprise-grade** - Serious, professional aesthetic

## 📱 Sections

1. **Preloader** - System-like initialization sequence
2. **Hero** - Massive headline with 3D background
3. **Problem** - Visual chaos representing bugs/errors
4. **Transition** - Grid formation showing control
5. **Process** - 5-step QA methodology
6. **Services** - 4 core capabilities
7. **Differentiators** - 3 bold statements
8. **Final CTA** - Engineering-focused call to action

## 🔧 Customization

### Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --accent: #00ff88;
  --accent-dim: #00aa55;
}
```

### Content
Update section content in `components/sections/*.tsx`

### Animations
Modify GSAP timelines and ScrollTrigger settings in each section component

## 🌐 Deployment

Deploy to Vercel:

```bash
npm run build
```

The site is optimized for production with Next.js automatic optimizations.

## 📄 License

Built for Code Assurance by a senior creative front-end engineer.

---

**Target Audience:** CTOs, Tech Leads, Engineering Managers at enterprise companies

**Core Emotions:** Technical excellence, quality obsession, engineering mindset

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
