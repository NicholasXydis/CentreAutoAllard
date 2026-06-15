<div align="center">

# Centre D'Auto Allard

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=3B82F6&center=true&vCenter=true&width=760&lines=Bilingual+Automotive+Business+Website;Next.js+%7C+TypeScript+%7C+React;Docker+%7C+Nginx+%7C+Cloudflare+%7C+Linux+VPS;51+Automated+Checks+%7C+Production+Deployed)](https://git.io/typing-svg)

A fast, accessible, bilingual website for a family-owned Montreal automotive service centre.

<br>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/typescript.svg" alt="TypeScript" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/tailwindcss.svg" alt="Tailwind CSS" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/docker.svg" alt="Docker" width="52" height="52">
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" alt="Nginx" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/cloudflare.svg" alt="Cloudflare" width="52" height="52">
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/xandemon/developer-icons@main/icons/linux.svg" alt="Linux VPS" width="52" height="52">
</p>

<p align="center">
  <strong>French + English</strong> &nbsp;|&nbsp;
  <strong>51 automated checks</strong> &nbsp;|&nbsp;
  <strong>CodeQL + Trivy security scans</strong> &nbsp;|&nbsp;
  <strong>Linux VPS deployed</strong>
</p>

<a href="https://centredautoallard.ca">
  <img src="docs/centre-auto-allard-btn.svg" alt="View Centre D'Auto Allard live site">
</a>

</div>

<br>

<div align="center">
  <img src="docs/demo.gif" alt="Centre D'Auto Allard website demo" width="42%">
</div>

<br>

## About

Centre D'Auto Allard is the production website for a family-owned automotive service centre in Montreal. It gives French and English speaking customers a clear, mobile-first way to explore services, call the garage, get directions, and find current business hours.

The site is statically generated with Next.js and deployed as a hardened Nginx container on a Linux VPS. GitHub Actions validates every change, scans the source and production image, publishes commit-SHA-tagged images to GHCR, and deploys approved releases over SSH. Cloudflare provides the public edge in front of the origin.

## Quality Highlights

- Mobile-first responsive design with dedicated desktop scaling.
- Semantic HTML and keyboard-accessible interactions.
- Reduced-motion behavior for users who request it.
- Optimized static delivery with long-lived immutable asset caching.
- Localized search metadata across all public routes.
- Dedicated social preview imagery using the recommended Open Graph aspect ratio.
- Production monitoring through container health checks, smoke tests, and Google Analytics.

## Features

- **Bilingual experience:** complete French and English routes powered by `next-intl`.
- **Responsive design:** purpose-built layouts for mobile, tablet, desktop, and landscape displays.
- **Business conversion:** prominent phone, contact, service, and Google Maps actions.
- **Search visibility:** localized metadata, canonical URLs, `hreflang`, sitemap, robots directives, and `AutoRepair` JSON-LD.
- **Social sharing:** dedicated 1200×630 Open Graph image for Facebook, LinkedIn, Discord, and X.
- **Accessibility:** semantic structure, keyboard navigation, skip links, visible focus states, localized labels, and reduced-motion support.
- **Motion design:** polished page transitions and interactions using Framer Motion.
- **Analytics:** Google Analytics page-view tracking built into the static production bundle.
- **Resilience:** localized 404 and error recovery experiences with production health checks.
- **Security headers:** CSP, HSTS, frame protection, MIME sniffing protection, and restrictive permissions policy.

## Architecture

```text
CentreAutoAllard/
├─ src/
│  ├─ app/                       Static App Router pages, metadata routes, errors
│  ├─ components/                Navigation, hero, language controls, motion primitives
│  ├─ config/                    Shared business and site configuration
│  ├─ i18n/                      Locale routing and next-intl request configuration
│  └─ lib/                       SEO, animation, and utility helpers
├─ messages/                     French and English translations
├─ public/                       Storefront and social-sharing assets
├─ docs/                         Demo media, quality evidence, and README assets
├─ e2e/                          Playwright production-route tests
├─ .github/workflows/            CI, security, image publishing, production deployment
├─ dockerfile                    Multi-stage Next.js export and Nginx image
├─ docker-compose.yml            Production container definition
├─ nginx.conf                    Static routing, caching, health checks, security headers
└─ next.config.ts                Static export and localization configuration
```

<div align="center">
<pre>
┌─────────────────────────────────────────────────────────┐
│                    Customer Browser                     │
│   Responsive FR/EN UI, SEO metadata, Google Analytics   │
└────────────────────────────┬────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────┐
│                  Cloudflare Edge Network                │
│            TLS, DNS, proxying, edge protection          │
└────────────────────────────┬────────────────────────────┘
                             │ Origin traffic
┌────────────────────────────▼────────────────────────────┐
│                       Linux VPS                         │
│       Docker Compose → hardened Nginx container         │
└────────────────────────────┬────────────────────────────┘
                             │ Static files
┌────────────────────────────▼────────────────────────────┐
│                  Next.js Static Export                  │
│         Localized HTML, CSS, JavaScript, assets         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

## Tech Stack

| Area       | Stack                                               |
| ---------- | --------------------------------------------------- |
| Frontend   | TypeScript, React 19, Next.js 16                    |
| Styling    | Tailwind CSS, Framer Motion, Lucide React           |
| DevOps     | Docker, GitHub Actions, Nginx, Cloudflare, Linux VPS |
| Testing    | Vitest, Playwright                                  |
| Monitoring | UptimeRobot, Google Analytics                       |

## Testing

| Suite                    |  Count | Coverage                                      |
| ------------------------ | -----: | --------------------------------------------- |
| Unit and component tests |     33 | 100% across the configured tested-logic scope |
| End-to-end checks        |     18 | Desktop and mobile Chromium                   |
| **Total**                | **51** | CI-enforced                                   |

## CI/CD

| Workflow          | File                                      | Purpose                                                   |
| ----------------- | ----------------------------------------- | --------------------------------------------------------- |
| CI                | `.github/workflows/ci.yml`                | Typecheck, lint, coverage, static build, Playwright E2E   |
| Security          | `.github/workflows/security.yml`          | CodeQL and Trivy filesystem/image scans                   |
| Publish Images    | `.github/workflows/publish-images.yml`    | Build, scan, and push GHCR image                          |
| Deploy Production | `.github/workflows/deploy-production.yml` | SSH deploy to Linux VPS and production smoke tests        |

<div align="center">
  <img src="docs/ci-cd-flow.svg" alt="CI and security checks gate image publishing, production deployment, and smoke testing" width="100%">
</div>

Any required gate failure blocks the release.

## Production Engineering

- Static output keeps the runtime surface small: no app server, database, authentication, or private API.
- The Nginx container runs as a non-root user with a read-only filesystem.
- Production images are pinned and published by commit SHA for traceable deployments.
- Deployment records capture the deployed SHA, image tag, and UTC release timestamp.
- Public health and route smoke tests run after every production deployment.
- UptimeRobot checks production availability every five minutes.

## Quality Gates

### SSL Labs

<div align="center">
  <img src="docs/screenshots/ssl-report.png" alt="SSL Labs A+ report for centredautoallard.ca" width="100%">
</div>

**TLS configuration:** A+ across all assessed Cloudflare edge endpoints.

### Lighthouse

<div align="center">
  <img src="docs/screenshots/lighthouse.png" alt="Lighthouse scores: 99 performance and 100 accessibility, best practices, and SEO" width="100%">
</div>

**Desktop Lighthouse audit:** 99 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.

### Uptime Monitoring

<div align="center">
  <img src="docs/screenshots/uptime-robot.png" alt="UptimeRobot production availability monitor" width="100%">
</div>

**External monitoring:** UptimeRobot checks the production site every five minutes. Container health checks, deployment smoke tests, and the public `/health` endpoint provide additional release and runtime verification.

## License

Copyright © 2026 Centre D'Auto Allard. All rights reserved.

The source code, configuration, design assets, and documentation are available for viewing only. See the [license](LICENSE) for the complete terms.
