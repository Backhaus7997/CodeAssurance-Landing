# 📋 DIAGNÓSTICO SEO - CODE ASSURANCE LANDING

**Fecha:** 2 de Febrero, 2026  
**Proyecto:** Code Assurance - QA Services Landing Page  
**Stack:** Next.js 16.1.4 + GitHub Pages (Static Export)  
**Objetivo:** Rankear para "QA services", "test automation", "quality assurance consulting"

---

## ESTADO ACTUAL

- ✅ Next.js 16.1.4 con `output: "export"` (static site)
- ✅ GitHub Pages compatible (trailingSlash: true)
- ✅ Metadata básica presente en layout.tsx
- ❌ Sin robots.txt, sitemap.xml, Open Graph, canonical
- ❌ Todo el contenido en una sola página (SPA con Preloader)
- ❌ Sin estructura de H1/H2/H3 semántica clara
- ❌ Sin páginas individuales para servicios

---

## 1️⃣ CHECKLIST SEO TÉCNICO

### METADATA & TAGS 🏷️

| Elemento | Estado | Ubicación correcta | Prioridad |
|----------|--------|-------------------|-----------|
| **Title único por página** | ⚠️ Solo global | `app/layout.tsx` o por ruta | HIGH |
| **Meta description** | ✅ Básica | Mejorar con keywords | HIGH |
| **Canonical URL** | ❌ Ausente | `app/layout.tsx` con `<link rel="canonical">` | HIGH |
| **Open Graph (OG)** | ❌ Ausente | `metadata.openGraph` en layout | MEDIUM |
| **Twitter Cards** | ❌ Ausente | `metadata.twitter` en layout | MEDIUM |
| **Schema.org (JSON-LD)** | ❌ Ausente | Component en `app/layout.tsx` | MEDIUM |
| **Viewport** | ✅ Auto Next.js | N/A | ✅ OK |
| **Lang attribute** | ✅ `lang="en"` | `app/layout.tsx` | ✅ OK |
| **Meta robots** | ❌ Ausente | Por página si es necesario | LOW |

### ROBOTS & CRAWLING 🤖

| Archivo | Estado | Ubicación | Prioridad |
|---------|--------|-----------|-----------|
| **robots.txt** | ❌ Ausente | `public/robots.txt` | HIGH |
| **sitemap.xml** | ❌ Ausente | `public/sitemap.xml` | HIGH |
| **404 page** | ⚠️ Default Next | `app/not-found.tsx` | MEDIUM |

### PERFORMANCE & CORE WEB VITALS ⚡

| Métrica | Estado Actual | Acción Requerida | Prioridad |
|---------|---------------|------------------|-----------|
| **Preloader** | ⚠️ Bloquea contenido inicial | Considerar SSR para texto crítico o prerender | MEDIUM |
| **Three.js bundle** | ⚠️ Puede ser pesado | Code splitting, lazy load | MEDIUM |
| **GSAP/Framer Motion** | ✅ OK | Monitorear bundle size | LOW |
| **Images** | ⚠️ `unoptimized: true` | Comprimir antes del build, usar WebP | MEDIUM |
| **Fonts** | ⚠️ System fonts OK | Considerar font-display: swap si usas custom | LOW |

### ACCESIBILIDAD ♿

| Elemento | Estado | Acción | Prioridad |
|----------|--------|--------|-----------|
| **Semantic HTML** | ⚠️ Parcial | Revisar H1/H2/H3 jerárquicos | HIGH |
| **Alt text en imágenes** | ❌ No hay imágenes aún | Agregar cuando incorpores logos/fotos | HIGH |
| **Focus indicators** | ⚠️ Revisar | Testear navegación por teclado | MEDIUM |
| **ARIA labels** | ⚠️ Parcial | Tabs en Packages necesitan aria-* | MEDIUM |
| **Color contrast** | ⚠️ Verde accent + gris | Validar WCAG 2.1 AA (4.5:1) | MEDIUM |

---

## 2️⃣ GITHUB PAGES / STATIC EXPORT - QUÉ APLICA Y QUÉ NO

### ✅ SÍ FUNCIONA (Static Export Compatible)

- Metadata estática en layout.tsx y page.tsx
- robots.txt y sitemap.xml en `/public`
- Open Graph y Twitter Cards (metadata object)
- JSON-LD Schema.org (client component con `<script>`)
- Image optimization manual (comprimir antes del build)
- Client-side routing (ya lo tenés con Preloader)
- Analytics client-side (Google Analytics, Plausible, etc.)

### ❌ NO FUNCIONA (Requiere Server)

- `generateMetadata()` dinámico (solo build-time)
- ISR (Incremental Static Regeneration)
- Server Actions
- API Routes (`/api/*`)
- `next/image` con optimización dinámica (por eso `unoptimized: true`)
- Middleware (Edge Functions)
- Dynamic OG image generation

### ⚠️ WORKAROUNDS PARA STATIC

- **Sitemap dinámico**: Generar `sitemap.xml` en build time con script
- **Contact form**: Ya lo tenés bien con Formspree (external service)
- **Search**: Client-side con Algolia o similar
- **Comentarios**: Disqus, Giscus, etc.

---

## 3️⃣ ARCHIVOS Y UBICACIONES CORRECTAS

```
/CodeAssurance-Landing-1/
├── app/
│   ├── layout.tsx              ← Metadata global, OG, Twitter, Schema
│   ├── page.tsx                ← Home metadata específica
│   ├── not-found.tsx           ← 404 personalizado
│   ├── services/
│   │   └── page.tsx            ← Página individual "Services"
│   ├── quality-check/
│   │   └── page.tsx            ← Detalle Quality Check
│   ├── quality-booster/
│   │   └── page.tsx            ← Detalle Quality Booster
│   ├── quality-squad/
│   │   └── page.tsx            ← Detalle Quality Squad
│   ├── about/
│   │   └── page.tsx            ← Quiénes somos
│   └── contact/
│       └── page.tsx            ← Formulario dedicado
│
├── public/
│   ├── robots.txt              ← Crawling rules
│   ├── sitemap.xml             ← Mapa del sitio
│   ├── favicon.ico             ← Favicon
│   ├── icon.svg / icon.png     ← Next.js auto-detecta
│   ├── apple-touch-icon.png    ← iOS icon
│   └── og-image.png            ← Open Graph default (1200x630)
│
├── components/
│   └── StructuredData.tsx      ← JSON-LD Schema component
│
└── scripts/
    └── generate-sitemap.js     ← Script para build (opcional)
```

---

## 4️⃣ RECOMENDACIONES DE CONTENIDO Y ESTRUCTURA

### KEYWORDS OBJETIVO 🎯

**Primarias:**
- QA services
- test automation
- quality assurance consulting
- software testing services
- QA consulting

**Secundarias:**
- automated testing services
- performance testing
- security testing
- code quality assurance
- QA team augmentation
- regression testing services

### ESTRUCTURA H1/H2 ACTUAL (Diagnóstico)

| Sección | H1 Actual | H2 Actual | Problema | Recomendación |
|---------|-----------|-----------|----------|---------------|
| **Hero** | "CODE ASSURANCE" | N/A | ✅ OK pero muy genérico | Considerar: "Professional QA Services & Test Automation" |
| **Problem** | N/A | N/A | ❌ Sin headings semánticos | Agregar H2: "Why Your Software Needs Professional QA" |
| **Process** | N/A | "Systematic Excellence" | ⚠️ Muy abstracto | "Our 4-Step QA Process" |
| **Services** | N/A | "Engineering-Grade Services" | ⚠️ OK pero genérico | "Core QA & Testing Services" |
| **Packages** | N/A | "Packages for Quality Assurance" | ✅ Bueno | Mantener |

### ESTRUCTURA RECOMENDADA (Páginas nuevas)

```
📄 Home (/)
├── H1: "Professional QA Services & Test Automation Consulting"
├── H2: "Why Software Quality Matters"
├── H2: "Our QA Process"
├── H2: "Core Testing Services"
└── H2: "QA Service Packages"

📄 Services (/services)
├── H1: "QA & Testing Services"
├── H2: "Automated Testing"
├── H2: "Performance Audit"
├── H2: "Security Review"
└── H2: "Code Quality"

📄 Quality Check (/quality-check)
├── H1: "Quality Check - Manual Functional QA"
├── H2: "What is Quality Check?"
├── H2: "Service Plans"
└── H2: "Who Needs This?"

📄 Quality Booster (/quality-booster)
├── H1: "Quality Booster - Test Automation Framework"
├── H2: "Automation Kickstart"
└── H2: "Plans & Pricing"

📄 Quality Squad (/quality-squad)
├── H1: "Quality Squad - Dedicated QA Team"
├── H2: "Team Augmentation"
└── H2: "Flexible Support"

📄 About (/about)
├── H1: "About Code Assurance"
└── H2: "Built by Engineers, For Engineers"

📄 Contact (/contact)
└── H1: "Contact Our QA Experts"
```

### ENLACES INTERNOS 🔗

**CRÍTICO**: Actualmente todo está en una sola página SPA. Para SEO, necesitás:

1. **Navegación principal** (header sticky):
   - Services → `/services`
   - Quality Check → `/quality-check`
   - Quality Booster → `/quality-booster`
   - Quality Squad → `/quality-squad`
   - About → `/about`
   - Contact → `/contact`

2. **Breadcrumbs** en páginas internas:
   ```
   Home > Services > Automated Testing
   ```

3. **CTAs contextuales**:
   - Desde cada servicio → Packages relacionado
   - Desde Packages → Formulario de contacto
   - Footer → Todas las páginas principales

4. **Footer sitemap** (ya lo tenés parcial):
   - Company: About, Contact
   - Services: [lista de servicios]
   - Packages: Quality Check, Booster, Squad

---

## 5️⃣ ERRORES TÍPICOS A EVITAR

### 🚨 ERRORES CRÍTICOS

| Error | Riesgo | Cómo Evitarlo |
|-------|--------|---------------|
| **Duplicate Titles** | Google penaliza | Cada página debe tener title único |
| **Missing Canonical** | Duplicate content | Siempre agregar `<link rel="canonical">` |
| **No Sitemap** | Indexación lenta | Generar sitemap.xml en build |
| **Broken Internal Links** | Crawl errors | Validar con next-sitemap o manualmente |
| **Hidden Content (Preloader)** | Googlebot puede no esperar | SSR del contenido crítico o prerender |
| **No Alt Text** | Pierde contexto de imágenes | Agregar alt descriptivo cuando agregues logos |
| **Imágenes Sin Comprimir** | Penaliza Core Web Vitals | WebP + compression (TinyPNG, Squoosh) |
| **Bloating JS** | LCP alto | Code splitting, lazy load Three.js |

### ⚠️ WARNINGS

| Issue | Impacto | Solución |
|-------|---------|----------|
| **Falta de H1 único** | Pierde contexto semántico | Un solo H1 por página con keyword principal |
| **CTAs sin keywords** | Pierde long-tail | "Get Expert QA Services" > "Get started" |
| **URLs sin keywords** | SEO débil | `/quality-assurance-services` > `/services` |
| **Sin meta keywords** | N/A (Google ignora) | No pierdas tiempo |
| **Sin lang alternates** | OK si es solo EN | Agregar solo si tenés ES/PT |

### ✅ BUENAS PRÁCTICAS QUE YA TENÉS

- ✅ `trailingSlash: true` (consistencia de URLs)
- ✅ Form submission externo (Formspree - no afecta SEO)
- ✅ System fonts (fast load)
- ✅ Client-side routing (smooth UX)
- ✅ Clutch widget (social proof - buen CTR)

---

## 6️⃣ LISTA PRIORIZADA POR IMPACTO & ESFUERZO

### 🔴 HIGH IMPACT + SMALL EFFORT

| Tarea | Impacto | Esfuerzo | Archivo | Detalles |
|-------|---------|----------|---------|----------|
| **Agregar robots.txt** | HIGH | S | `public/robots.txt` | `User-agent: *` / `Allow: /` / `Sitemap: https://[tu-dominio]/sitemap.xml` |
| **Agregar sitemap.xml básico** | HIGH | S | `public/sitemap.xml` | Manualmente con URLs de páginas principales |
| **Canonical URL** | HIGH | S | `app/layout.tsx` | `metadata.alternates.canonical = "https://[base-url]"` |
| **Mejorar meta description** | HIGH | S | `app/layout.tsx` | Incluir "QA services", "test automation", "quality assurance consulting" |
| **Open Graph básico** | HIGH | S | `app/layout.tsx` | `metadata.openGraph` con title, description, url, image |
| **H1 único por página** | HIGH | M | Cada `page.tsx` | Cambiar Hero H1 a incluir keywords |

### 🟠 HIGH IMPACT + MEDIUM EFFORT

| Tarea | Impacto | Esfuerzo | Archivo | Detalles |
|-------|---------|----------|---------|----------|
| **Crear páginas individuales** | HIGH | M | `app/services/`, `app/quality-check/`, etc. | Separar SPA en rutas con contenido único |
| **Schema.org JSON-LD** | HIGH | M | Component en layout | Organization, Service, Product schema |
| **Optimizar imágenes** | HIGH | M | Proceso manual | WebP, compression, tamaños responsivos |
| **Revisar estructura H2/H3** | HIGH | M | Todos los componentes | Jerarquía semántica clara |
| **Internal linking strategy** | HIGH | M | Nav component + pages | Enlaces contextuales con anchor text keywords |

### 🟡 MEDIUM IMPACT + SMALL EFFORT

| Tarea | Impacto | Esfuerzo | Archivo | Detalles |
|-------|---------|----------|---------|----------|
| **Twitter Cards** | MEDIUM | S | `app/layout.tsx` | `metadata.twitter` |
| **404 personalizado** | MEDIUM | S | `app/not-found.tsx` | Branded 404 con enlaces útiles |
| **Favicon completo** | MEDIUM | S | `public/` | favicon.ico, apple-touch-icon.png |
| **Meta theme-color** | MEDIUM | S | `app/layout.tsx` | `metadata.themeColor = "#00ff88"` |

### 🟢 MEDIUM IMPACT + MEDIUM EFFORT

| Tarea | Impacto | Esfuerzo | Archivo | Detalles |
|-------|---------|----------|---------|----------|
| **Breadcrumbs** | MEDIUM | M | Component reutilizable | Schema.org BreadcrumbList |
| **Lazy load Three.js** | MEDIUM | M | `AbstractMesh.tsx` | Dynamic import, suspense |
| **Contact page dedicada** | MEDIUM | M | `app/contact/page.tsx` | Form + keywords locales si aplica |
| **Blog/Resources section** | MEDIUM | L | `app/blog/` | Long-tail SEO, authority |

### ⚪ LOW IMPACT (opcional)

| Tarea | Impacto | Esfuerzo | Notas |
|-------|---------|----------|-------|
| **Hreflang tags** | LOW | M | Solo si tenés idiomas múltiples |
| **Preconnect DNS** | LOW | S | Para fonts/CDNs externos |
| **Security headers** | LOW | N/A | GitHub Pages no permite configurar |

---

## 📊 ROADMAP SUGERIDO (3 fases)

### FASE 1: FUNDAMENTOS (1-2 días)

1. Crear `robots.txt` + `sitemap.xml`
2. Agregar canonical, OG, Twitter Cards en layout
3. Mejorar meta description con keywords
4. Revisar H1 único con keywords
5. Comprimir imágenes si las agregás

**Resultado esperado:** Indexación correcta + metadata completa

### FASE 2: ESTRUCTURA (1 semana)

1. Crear páginas individuales (/services, /quality-check, etc.)
2. Implementar nav sticky con enlaces internos
3. Agregar Schema.org JSON-LD (Organization, Service)
4. Revisar jerarquía H2/H3 en todo el sitio
5. 404 personalizado

**Resultado esperado:** Sitio multi-página con URLs específicas por servicio

### FASE 3: OPTIMIZACIÓN (1-2 semanas)

1. Lazy load Three.js y optimizar bundle
2. Breadcrumbs con schema
3. Internal linking strategy completa
4. Monitorear Core Web Vitals (Lighthouse)
5. Blog o Resources (opcional para long-tail)

**Resultado esperado:** Performance optimizada + contenido evergreen

---

## 🔍 INFORMACIÓN PENDIENTE PARA MAYOR PRECISIÓN

Para poder darte ejemplos exactos de código, necesito:

1. **¿Cuál es tu dominio final?** (ej: `code-assurance.com`, `username.github.io/repo`)
2. **¿Usás custom domain en GitHub Pages?** (afecta canonical/sitemap)
3. **¿Tenés logo o imágenes?** (para alt text y OG image)
4. **¿Target geográfico?** (para schema.org y hreflang si es internacional)
5. **¿Competidores directos?** (para analizar keywords que usan)

---

## ✅ CONCLUSIÓN Y PRÓXIMOS PASOS

### DIAGNÓSTICO FINAL

**Tu sitio tiene buen diseño y UX, pero está 100% orientado a experiencia visual y 0% a SEO técnico.**

**Estado actual:**
- 🎨 Diseño: 9/10
- 🚀 UX: 8/10
- 🔍 SEO Técnico: 2/10
- 📄 Contenido SEO: 3/10
- ⚡ Performance: 6/10

### TOP 3 PRIORIDADES INMEDIATAS

1. **robots.txt + sitemap.xml** (15 min)
   - Sin esto, Google indexa de forma impredecible
   
2. **Canonical + OG/Twitter** (30 min)
   - Evita duplicate content y mejora social sharing
   
3. **Crear páginas separadas para servicios** (estructural, crítico para rankear)
   - Sin páginas individuales, Google verá una única página SPA sin contexto sobre cada servicio
   - Dificulta rankear para keywords específicas como "test automation services" o "QA consulting"

### IMPACTO ESPERADO POR FASE

**Fase 1 (Fundamentos):**
- Indexación correcta en Google
- Aparición en búsquedas de marca ("Code Assurance")
- Social sharing funcional

**Fase 2 (Estructura):**
- Ranking para keywords específicas ("quality check QA", "test automation services")
- Tráfico orgánico de long-tail keywords
- Rich snippets potenciales (con schema)

**Fase 3 (Optimización):**
- Mejora en posiciones (de página 2-3 a página 1)
- Core Web Vitals óptimos (ranking factor)
- Autoridad de dominio si agregás blog

### RECURSOS ÚTILES

**Tools SEO:**
- Google Search Console (obligatorio)
- Lighthouse (Chrome DevTools)
- Screaming Frog (crawl test)
- Schema.org validator
- PageSpeed Insights

**Referencias técnicas:**
- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Service Type](https://schema.org/Service)

---

**¿Listo para empezar? Recomiendo arrancar por Fase 1 (fundamentos) que toma 1-2 días y tiene impacto inmediato.**
