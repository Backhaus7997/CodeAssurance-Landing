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

### Folder structure (App Router)
- `app/page.tsx` → Home (EN)
- `app/es/page.tsx` → Home (ES)
- `app/services/<slug>/page.tsx` → Service landing (EN)
- `app/es/services/<slug>/page.tsx` → Service landing (ES)

Each page defines:
- `alternates.canonical`
- `alternates.languages` (`en`, `es`, `x-default`)
- OpenGraph locale (`en_US` / `es_ES`)

## 🏗️ Project Structure

```
app/
├── layout.tsx                # Root layout (shared)
├── globals.css               # Global styles
├── page.tsx                  # Home route (EN) - server component + metadata
├── HomeClient.tsx            # Home UI (EN) - client component (sections + animations + smooth scroll)
├── services/                 # Service landings (EN)
│   ├── automated-testing/
│   │   ├── page.tsx          # Metadata + server wrapper
│   │   └── AutomatedTestingClient.tsx  # Client UI for the landing
│   ├── code-quality/
│   │   ├── page.tsx
│   │   └── CodeQualityClient.tsx
│   ├── performance-audit/
│   │   ├── page.tsx
│   │   └── PerformanceAuditClient.tsx
│   └── security-review/
│       ├── page.tsx
│       └── SecurityReviewClient.tsx
└── es/                       # Spanish version (same structure/content as EN, translated only)
    ├── layout.tsx            # (If present) ES layout overrides/shared wrapper
    ├── page.tsx              # Home route (ES) - server component + metadata (hreflang/canonical)
    ├── HomeClientEs.tsx       # Home UI (ES) - client component
    ├── components/            # ES home sections (translated duplicates of EN sections)
    │   └── section-es/
    │       ├── HeroEs.tsx
    │       ├── ProblemEs.tsx
    │       ├── TransitionEs.tsx
    │       ├── ProcessEs.tsx
    │       ├── ServicesEs.tsx
    │       ├── PackagesEs.tsx
    │       ├── DifferentiatorsEs.tsx
    │       ├── FinalCTAEs.tsx
    │       └── FooterEs.tsx
    └── services/              # Service landings (ES)
        ├── automated-testing/
        │   ├── page.tsx
        │   └── AutomatedTestingClient.tsx
        ├── code-quality/
        │   ├── page.tsx
        │   └── CodeQualityClient.tsx
        ├── performance-audit/
        │   ├── page.tsx
        │   └── PerformanceAuditClient.tsx
        └── security-review/
            ├── page.tsx
            └── SecurityReviewClient.tsx

components/
├── sections/
│   ├── Preloader.tsx          # System initialization loader
│   ├── Hero.tsx               # Hero section with 3D mesh
│   ├── Problem.tsx            # Problem visualization (chaos)
│   ├── Transition.tsx         # Chaos to control transition
│   ├── Process.tsx            # QA process steps
│   ├── Services.tsx           # Service cards
│   ├── Differentiators.tsx    # Key differentiators
│   └── FinalCTA.tsx           # Call to action
├── three/
│   └── AbstractMesh.tsx       # 3D animated sphere
└── ui/                        # Reusable UI components

hooks/
└── useLenis.ts                # Smooth scrolling hook

lib/
└── utils.ts                   # Utility functions
```

## 🔎 SEO

Implemented technical SEO foundations:

- `public/robots.txt` → allows crawling and references the sitemap
- `public/sitemap.xml` → includes EN + ES routes
- Canonical URLs per page (`alternates.canonical`)
- hreflang per page (`alternates.languages`: `en`, `es`, `x-default`)
- Open Graph / Twitter metadata + `public/og-image.png` (1200×630)

✅ When adding a new page/landing:
1) add the URL to `public/sitemap.xml`
2) add canonical + `alternates.languages` in `page.tsx`
3) validate with Google Search Console (URL Inspection)


## 🌍 Languages & Routes (EN / ES)

This site is bilingual:

- **English (default):**
  - `/`
  - `/services/automated-testing/`
  - `/services/performance-audit/`
  - `/services/security-review/`
  - `/services/code-quality/`

- **Español:**
  - `/es`
  - `/es/services/automated-testing/`
  - `/es/services/performance-audit/`
  - `/es/services/security-review/`
  - `/es/services/code-quality/`

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

## Static Export & GitHub Pages Deployment

This project is deployed as a fully static site using GitHub Pages and a custom domain.

Because GitHub Pages only serves static assets, the project uses Next.js static export (output: \"export\") instead of a Node.js runtime.

The contents of the "out/" directory are copied to the repository root so GitHub Pages can serve them directly.
	•	The repository root therefore contains:
	•	index.html
	•	_next/ (static JS/CSS chunks)
	•	404.html
	•	static assets

This setup mirrors how the previous version of the site (old page, before the landing page) was deployed and ensures compatibility with GitHub Pages and custom DNS.

🚫 Jekyll Disabled
GitHub Pages uses Jekyll by default, which ignores folders starting with "_" (such as _next/).

To prevent this behavior, a ".nojekyll" file is included at the repository root: ".nojekyll"

This ensures that all Next.js static assets are served correctly.

## Important if you made changes this is the way to upload them in the real page (no in localhost)
🧱 Build & Deploy Process (Step by Step)

1️⃣ Build the static site
Every time you make changes to the website, follow these steps exactly: "npm run build"
This will generate the following folder: "/out"
2️⃣ Clean previous root files: "rm -rf _next index.html 404.html"
3️⃣ Copy the contents of out to the root: "cp -R out/* ."
4️⃣ Commit and push the changes
EXAMPLE
git add .
git commit -m "Update static site"
git push
🌍 Viewing changes in production
	1.	Wait 1–2 minutes
	2.	Open the site: https://code-assurance.com
If you don’t see the changes, hard refresh the page or open it in an incognito window.