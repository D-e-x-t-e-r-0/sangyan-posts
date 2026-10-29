# SANGYAN Posts

The newsroom for SANGYAN, the investor resilience hackathon by SNTC, IIT (BHU)
Varanasi in collaboration with SEBI and NSDL. A standalone Next.js app built as
an editorial broadsheet: masthead, auto-advancing hero slideshow, and a
filterable dispatch ledger.

## Run locally

```bash
bun install
bun dev
```

Open http://localhost:3000.

```bash
bun run build   # production build
bun run start   # serve the production build
bun run lint    # eslint
```

## Routes

| Route            | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `/`              | Broadsheet homepage: hero slideshow, wire, archive ledger |
| `/posts/[slug]`  | Full dispatch article                                     |
| `/?category=...` | Archive pre-filtered by `winners`, `media`, etc.          |

The homepage archive also filters and searches client-side without a page
reload. `?category=` is read on first render so links into a specific desk work.

## Publishing a post

All content lives in [`src/content/posts.ts`](src/content/posts.ts). To publish:

1. Add a cover image to `public/posts/` (1200×800 works best). The cover appears
   as the archive thumbnail.
2. Optionally add a separate wide, art-only hero image (1600×800 works best) for
   the homepage slideshow and the article banner. If `hero` is omitted, the
   cover is used in its place.
3. Add a `Post` entry to the `POSTS` array:

```ts
{
  slug: "my-new-dispatch",
  title: "My New Dispatch",
  ticker: "SHORT TICKER LABEL",
  excerpt: "One or two sentences shown on cards and in search results.",
  category: "announcements", // winners | media | announcements | stories
  date: "2026-10-09",        // YYYY-MM-DD, newest sorts first
  author: "SANGYAN Newsroom",
  cover: "/posts/my-new-dispatch.svg",
  hero: "/posts/hero-my-new-dispatch.svg", // optional
  coverAlt: "Describe the image for screen readers.",
  tags: ["Tag one", "Tag two"],
  featured: false,           // one post can lead the homepage slideshow
  body: [
    { type: "p", text: "Opening paragraph." },
    { type: "h2", text: "A section heading" },
    { type: "p", text: "More copy." },
    { type: "quote", text: "A pull quote." },
    { type: "list", items: ["First point", "Second point"] },
  ],
}
```

4. Deploy. The homepage slideshow and filmstrip, archive filters, top wire,
   counts, and related posts all update from this file automatically.

## Layout

- `SiteHeader` renders the fixed top wire, centered masthead, and sticky index.
- `HeroSlider` auto-advances every 7 seconds, with previous/next, pause/resume,
  swipe, keyboard arrows, and a selectable filmstrip. Autoplay and the progress
  bar are disabled for `prefers-reduced-motion`.
- `PostsLedger` handles desk filters and search over the full archive.
- Article pages add a byline rail, drop cap, and related dispatches.

## Rebranding

`src/content/site.ts` controls the brand name, section label, tagline,
organisation names, volume/edition, and external links. The masthead currently
renders `SANGYAN` + `POSTS`; change `brand` and `section` there when the final
name is decided.

## Notes

- Placeholder covers and hero art are local SVGs in `public/posts/`. Replace
  them with real images (JPG/PNG/SVG) and update each post's `cover` and `hero`
  paths.
- The organiser/collaborator logos are copied from the hackathon site.
- No database is required. Publishing is a file change plus a deploy.
- Before launch, set `NEXT_PUBLIC_SITE_URL` (e.g. in Vercel) to the production
  origin. It drives `metadataBase`, `robots.txt`, and `sitemap.xml`. The fallback
  is `https://sangyan.copsiitbhu.co.in`.
