# BabyBlue Modern Catering: website

A static [Astro](https://astro.build) site for babybluecatering.com, built to replace the GoDaddy WordPress install and deployed free on GitHub Pages.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Where things live

| What | File |
|---|---|
| Business name, phone, email, service-area cities, socials, **Formspark ID** | `src/data/site.ts` |
| Each service/experience page (copy, price, inclusions, FAQs, photos) | `src/content/services/*.md` |
| Past client menus (shown on service pages) | `src/content/menus.json` |
| Testimonials, beverage packages, "How it works", site-wide FAQs | `src/data/content.ts` |
| Photos | `src/assets/photos/` (auto-converted to responsive AVIF/WebP at build) |
| Old WordPress URLs → new pages | `redirects` in `astro.config.mjs` |
| Colors, type, spacing | `src/styles/global.css` (`:root` tokens) |

### Common edits

- **Change a price:** edit `price.from` in that service's `.md` file.
- **Add a new service:** copy an existing `.md` in `src/content/services/` and rename it. The filename becomes the URL (`sushi-class.md` becomes `/sushi-class/`). It appears automatically in the nav hubs, footer, sitemap, inquiry form dropdown and `llms.txt`.
- **Add a past menu:** add an entry to `menus.json`, then reference its `id` in a service's `menus:` list.
- **Change the phone number or cities:** `src/data/site.ts`. That one file updates every page and all structured data.

## SEO built in

- A unique `<title>` and meta description per page, targeting "[service] + McKinney, TX"
- JSON-LD on every page. `FoodEstablishment`/`LocalBusiness` (name, phone, city and service area) is shared site-wide. Each service page adds `Service` + `Offer` (real prices), `Menu` (past client menus), `BreadcrumbList` and `FAQPage`. The About page adds `Person` for Chef Jacob.
- Canonical URLs, Open Graph and Twitter cards with auto-generated 1200×630 share images
- `sitemap-index.xml`, `robots.txt`, and `llms.txt` (a plain-text summary for AI assistants)
- Redirect pages for every old WordPress URL so existing links and rankings carry over
- Descriptive image filenames and alt text, and responsive images with lazy loading
- Lighthouse (mobile): Performance 98–100, Accessibility 100, Best Practices 100, SEO 100

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (the contents of `claude/` should be the repo root).
2. Repo **Settings → Pages → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
3. **Custom domain:** `public/CNAME` already contains `babybluecatering.com`. In GoDaddy DNS, point the apex `A` records to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` as a `CNAME` to `<username>.github.io`. Then tick **Enforce HTTPS** in Pages settings.
4. After launch, submit `https://babybluecatering.com/sitemap-index.xml` in Google Search Console.

## Inquiry form (Formspark)

The form posts directly to Formspark, so no server is needed.

1. Create a form at [formspark.io](https://formspark.io) and copy its ID.
2. Paste it into `formsparkId` in `src/data/site.ts`.
3. Recommended: enable **Botpoison** or **Turnstile** spam protection in Formspark. A honeypot is already included.

Submissions redirect to `/thank-you/`, which is excluded from the sitemap and set to `noindex`.

## Photos we still need

Photo positions that need new images use `<PhotoSlot brief="...">`, with the direction for each shot kept in `src/data/photos.ts`.

- A slot **with** an older photo shows it with an "Update requested" tag.
- A slot **without** a photo shows a styled placeholder that describes the shot.
- **`/photo-shot-list/`** is a private page (noindex, not in the sitemap) listing every shot with orientation and styling notes. Send it to the photographer.

To swap in a new photo, drop it into `src/assets/photos/` and pass it as `src` to that slot. **Before launch, set `showPhotoNotes: false` in `src/data/site.ts`.** That hides every tag and placeholder label.

## To confirm with Jake before launch

Search for `TODO(confirm)` in the code.

- [ ] **Phone number:** the site still uses **814-566-5797** from the old site. Is that current for Texas?
- [ ] **Service-area cities** in `site.ts` are an educated guess around McKinney.
- [ ] **Licensing/insurance wording:** the old site cited the *Erie County* Health Department. The new copy says "fully insured and certified in food safety and handling." Confirm it's accurate for Texas (Collin County).
- [ ] **Prices** are carried over as-is from the old site (last edited May 2024).
- [ ] **Client names on sample menus** ("Prepared for Dennis & Jeri") were already public on the old site, but it's worth a quick OK.
- [ ] **Google Business Profile:** make sure its name, phone and category exactly match the site.
- [ ] New photography: his wife's shoot would upgrade this more than anything else.
