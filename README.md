# Anshu Kumar — Portfolio

React 19 + Framer Motion 12 + esbuild. Plain CSS, self-hosted fonts, no UI library. Builds to a static `dist/` folder.

## Commands

```bash
npm install
npm run dev      # dev server with rebuild on save → http://localhost:5173
npm run build    # production build → dist/
npm run check    # content check (leftover [PLACEHOLDERS], missing assets, non-https links) + build
```

## Where to edit things

| What | File |
|---|---|
| Name, headline, intro, bio, availability, contact, socials, skills, tools, colours, fonts, section toggles | `src/config/site.js` |
| Projects (featured + archive) | `src/data/projects.js` |
| Journey timeline and education | `src/data/experience.js` |
| Portrait, project screenshots, résumé | `public/assets/…` (then point to them from the config) |

All personal details live in those three files. Components only read from them.

## Before you publish

1. Set `websiteUrl` in `site.js` to your real domain. It drives the canonical and `og:url` tags, which are left out while it's empty.
2. Make sure the email in `contact.email` is the one you want shown publicly.
3. Add `linkedin` (and anything else you use) in `contact`.
4. Add the TakaTime and EaseMotion PR links as `sourceUrl` in `projects.js`.
5. Optional: add screenshots (`coverImage: "/assets/projects/tokengate.webp"`, 1200×750 WebP works well). Without one, a card shows a generated typographic cover.
6. Optional: add `portrait` and `resume`, then set `showDownloadResume: true`.

## Things to know

- **Motion toggle.** It's saved in localStorage under `anshu-motion` and defaults to the OS `prefers-reduced-motion` setting.
- **Contact form.** It opens the visitor's email app through `mailto:`. Nothing is sent from the page itself. To use a real backend, swap the `submit` handler in `Contact.jsx` for Formspree or similar.
- **WhatsApp.** The button only shows up if `contact.whatsapp` is set.
- **Fonts.** Anton, Manrope and Caveat are bundled through `@fontsource`. If you change the fonts in `site.appearance`, install the matching `@fontsource/<font>` package and update the imports at the top of `src/main.jsx`.

## Deploy

Run `npm run build` and upload `dist/`. On Netlify or Vercel, use build command `npm run build` with publish directory `dist`.
