# Future Softly

Portfolio site for [futuresoftly.studio](https://futuresoftly.studio), built with
[Astro](https://astro.build) and [Sanity](https://www.sanity.io).

```
src/        Astro site (pages, layout, styles, Sanity queries)
public/     Fonts, favicon, CNAME, copied as-is
studio/     Sanity Studio (content schema and editor)
```

## Develop

```sh
npm install
npm run dev          # http://localhost:4321
```

Without a Sanity project configured, the site renders the fallback content in
`src/lib/content.ts` (the original single page). To read from Sanity, copy
`.env.example` to `.env` and fill in `PUBLIC_SANITY_PROJECT_ID`.

Studio:

```sh
cd studio
npm install
cp .env.example .env # set SANITY_STUDIO_PROJECT_ID
npm run dev          # http://localhost:3333
npm run deploy       # hosts the Studio at <name>.sanity.studio
```

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages
on every push to `main`. One-time setup:

1. Repo Settings → Pages → Source: **GitHub Actions**.
2. Repo Settings → Secrets and variables → Actions → Variables: add
   `SANITY_PROJECT_ID` (and `SANITY_DATASET` if it isn't `production`).
3. To rebuild when content is published, add a Sanity webhook
   (sanity.io/manage → API → Webhooks) that POSTs to
   `https://api.github.com/repos/kaisershaffer/futuresoftly/dispatches` with
   body `{"event_type": "sanity-publish"}` and headers
   `Authorization: Bearer <fine-grained token with Contents: write>` and
   `Accept: application/vnd.github+json`.
