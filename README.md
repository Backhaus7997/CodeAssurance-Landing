# code-assurance.com

Marketing site for Code Assurance: a Next.js 16 (App Router) static export served by GitHub Pages
from the root of `main`, with English at `/` and Spanish at `/es/`.

The design and the decisions behind it are in
`docs/superpowers/specs/2026-11-09-rediseno-landing-outbound-design.md`.

## Pages

| URL | Source |
|---|---|
| `/`, `/es/` | `app/(en)/page.tsx`, `app/(es)/es/page.tsx` → `components/home/HomePage.tsx` |
| `/services/<slug>/`, `/es/services/<slug>/` | `app/(en)/services/[slug]`, `app/(es)/es/services/[slug]` → `components/services/ServicePage.tsx` |
| `/how-we-work/` | the outbound one-pager, English only, `noindex` → `components/how-we-work/HowWeWorkPage.tsx` |
| `/privacy/`, `/es/privacy/` | `components/site/PrivacyPage.tsx` |
| 404 | `app/global-not-found.tsx` |

Each language has its own root layout (`app/(en)/layout.tsx`, `app/(es)/es/layout.tsx`) so the
`<html lang>` is right on every page.

## Editing text

All copy lives in `content/`, typed by `content/types.ts`:

- `content/en.ts`, `content/es.ts`: home, header, footer, form, privacy and 404.
- `content/how-we-work.ts`: the one-pager.
- `content/services/en.ts`, `content/services/es.ts`: the four service pages.
- `content/site.ts`: contact email, phone and site URL.

`npm test` fails if any text mentions `npm`, `npx`, "package", `qaa-agent` or unbacked numbers
such as `99.9`, `10x` or "zero downtime", or if the English and Spanish versions drift apart.

## Booking link

Every "Book a call" button reads `NEXT_PUBLIC_BOOKING_URL` at build time. When it is empty the
buttons are not rendered and email becomes the main call to action. A value that does not start
with `https://` stops the build.

## Animation

Animated components come from 21st.dev and are installed from their MIT registries with the shadcn
CLI (`components.json`): Magic UI, Aceternity UI and Fancy Components. They live in `components/ui`
and `components/fancy`, adapted so that text is visible without JavaScript and nothing moves with
"reduce motion" (each file says what changed). Content revealed on scroll is hidden only under
`html.js`, a class set by an inline script in each root layout.

## Scripts

```bash
npm run dev         # local development
npm run build       # static export to out/
npm run lint
npm run typecheck
npm test            # Vitest: content rules, booking URL, contact form
npm run test:e2e    # builds, then Playwright on desktop, 375 px and iPhone (WebKit)
node scripts/first-load-js.mjs out/index.html   # gzip size of the scripts the home loads
node scripts/make-icons.mjs                     # favicon.ico and apple-icon.png from app/icon.svg
```

The first time, install the test browsers with `npx playwright install chromium webkit`.

## Publishing (GitHub Pages)

GitHub Pages serves the repository root of `main`, so the build output is copied there and
committed. `CNAME` and `.nojekyll` (which lets Pages serve `_next/`) stay as they are.

```bash
NEXT_PUBLIC_BOOKING_URL="https://cal.com/<your-link>" npm run build
rm -rf _next 404 404.html _not-found _not-found.html _not-found.txt __next.*.txt index.html index.txt \
  es services privacy how-we-work favicon.ico icon.svg apple-icon.png logo.svg \
  file.svg globe.svg next.svg vercel.svg window.svg sitemap.xml robots.txt og-image.png
cp -R out/. .
git add -A
git commit -m "Publish site"
git push origin main
```

The site updates one or two minutes after the push. If the old version still shows, hard-refresh
or open a private window.
