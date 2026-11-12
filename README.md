# bleand.github.io

Leandro Basla's portfolio page, served by GitHub Pages at <https://bleand.github.io/>. It is a single landing page: a hero with links to [leandrobasla.com](https://leandrobasla.com/) (blog, research, about) and social profiles, followed by a grid of project cards.

## Tech stack

- Plain HTML, CSS and JavaScript. There is no build step and no dependencies.
- [Geist](https://fonts.google.com/specimen/Geist) loaded from Google Fonts.
- Google Analytics (gtag.js).
- Python's built-in `http.server`, used only to preview the site locally.

## Project structure

```
index.html      Page markup: hero, links and project cards
style.css       All styles; design tokens are CSS variables at the top
script.js       Scroll-triggered entrance animation and hero fade
favicon.ico     Browser tab icon
assets/         Logo and icon PNGs (favicon, touch icon, hero logo, link-preview image)
run.ps1         Operation script for local preview (Windows)
```

## Prerequisites

- Python 3 on your `PATH` (only for the local preview server).
- PowerShell, to use `run.ps1`.

## Setup

```powershell
git clone https://github.com/bleand/bleand.github.io.git
cd bleand.github.io
.\run.ps1 run
```

The site opens at <http://127.0.0.1:8000/>. You can also open `index.html` directly in a browser.

## Available commands

All commands take an optional port (default `8000`), e.g. `.\run.ps1 run 8080`.

| Command | Purpose |
|---|---|
| `.\run.ps1 run` / `run-local` | Serve the site locally and open it in the browser |
| `.\run.ps1 run-frontend` | Same as `run` (the site is frontend-only) |
| `.\run.ps1 run-frontend-debug` | Serve with caching disabled, so every reload picks up your edits |

There is no backend and no Docker setup, so `run-backend` and `run-docker` do not apply.

## Environment variables

None.

## Deployment

GitHub Pages serves the `master` branch root. Pushing to `master` publishes the site.

## Architecture notes

- **Design tokens.** Colours, radii and transition timings are CSS variables in `:root` of `style.css`, matching leandrobasla.com: near-black surfaces, with coral (`#ff6b6b`) reserved for actions and focus rings.
- **Progressive enhancement.** Elements with the `reveal` class fade in on scroll. They are only hidden once `script.js` adds a `js` class to `<html>`, so the page is fully visible if the script fails to load. The animation is skipped when the visitor prefers reduced motion.
- **Adding a project.** Copy an `<article class="card reveal">` block in `index.html` and change the title, description and link. The grid reflows on its own.
- **Logo files.** The files in `assets/` and `favicon.ico` are copies of the generated logo files from the `personal-site` repo (`public/`). Regenerate them there and copy them over if the logo changes.
