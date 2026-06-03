# Tawanen Website

Static multilingual website for **Tawanen ASBL** — a Brussels-based network at the intersection of audiovisual arts, cinema, culture, and politics.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Tawānigraph (production) | `tawanigraph.html` |
| Tawanoscope (labs) | `tawanoscope.html` |
| Tawān Film Club | `film-club.html` |
| Urban Temporalities | `urban-temporalities.html` |
| BEFF 2027 | `beff-2027.html` |
| Contact | `contact.html` |

## Languages

The site supports **English**, **French**, **Dutch**, and **Arabic** (with RTL layout). Translations live in `assets/i18n/`. The language switcher in the header persists the user's choice in `localStorage`.

To edit copy, update the JSON files in `assets/i18n/` — each key maps to a `data-i18n` attribute in the HTML.

## Brand

The visual identity is driven by `assets/images/logo.png`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-black` | `#000000` | Page background |
| `--color-charcoal` | `#3d3d3d` | Surfaces, cards (matches logo grey) |
| `--color-accent` | `#c94848` | Links, buttons, labels (logo red, lightened for contrast) |
| `--color-accent-light` | `#e06060` | Hover states |
| `--color-grey-brand` | `#b8b8b8` | Secondary brand grey |
| `--color-offwhite` | `#d4d4d0` | Body text |

Border radii (`--radius-sm/md/lg`) follow the logo's rounded, hand-drawn geometry.

## YouTube videos

Channel: [@TawanenBxl](https://www.youtube.com/@TawanenBxl)

Videos are listed in [`assets/videos.json`](assets/videos.json). When you publish new videos, add an entry:

```json
{
  "id": "YOUTUBE_VIDEO_ID",
  "title": "Video title"
}
```

The home, about, BEFF, and Urban Temporalities pages embed from this file automatically via `js/videos.js`.

To find the video ID: `https://www.youtube.com/watch?v=THIS_PART`

## Local preview

Because the site loads translations via `fetch()`, you need a local server (opening `index.html` directly in a browser will block JSON loading due to CORS).

```bash
# Python
python3 -m http.server 8080

# Node (if npx available)
npx serve .

# PHP
php -S localhost:8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Deploy

### Netlify (recommended)

1. Push this folder to a Git repository
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. No build command needed — publish directory is the repo root
4. Deploy

Or drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop).

### Cloudflare Pages

1. Push to Git
2. **Workers & Pages** → **Create** → **Connect to Git**
3. Build command: *(leave empty)*
4. Output directory: `/`

### Custom domain

Point your domain's DNS to the hosting provider. Both Netlify and Cloudflare provide free HTTPS.

## Contact form

The contact form uses [FormSubmit.co](https://formsubmit.co) and sends messages to **tawanenbxl@gmail.com**.

**First submission:** FormSubmit will email you a confirmation link — click it once to activate the form.

After activation, submissions redirect back to the contact page with a success message.

To switch to [Formspree](https://formspree.io) instead, replace the form `action` in `contact.html`.

## Updating content

| What to change | Where |
|----------------|-------|
| Text / translations | `assets/i18n/en.json`, `fr.json`, `nl.json`, `ar.json` |
| Images | `assets/images/` (replace files, keep filenames or update HTML) |
| Logo | `logo.png` in project root — used in header, footer, favicon |
| Videos | `assets/video/` |
| Styles | `css/` |
| Instagram handle | Search for `tawanenbxl` in HTML files |

## Assets

Web-optimized media lives under `assets/`:

- **Images**: JPEG, max 1920px wide (~130–450 KB each) in `assets/images/`
- **Videos**: H.264 in `assets/video/` (`opening.mp4` 6.4 MB, `timeline.mp4` ~20 MB, `insta.mp4` 6.6 MB). Keep each file under 25 MB for Cloudflare Workers.

To re-compress videos:

```bash
ffmpeg -i source.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset medium -movflags +faststart assets/video/output.mp4
```

## Structure

```
├── index.html
├── about.html
├── tawanigraph.html
├── tawanoscope.html
├── film-club.html
├── urban-temporalities.html
├── beff-2027.html
├── contact.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── i18n.js
│   ├── main.js
│   └── video.js
└── assets/
    ├── images/
    ├── video/
    └── i18n/
```

## Contact

- **Email:** tawanenbxl@gmail.com
- **Phone:** +32 491 22 92 47
- **Address:** Rue de Laeken 157, 1000 Brussel
- **YouTube:** [@TawanenBxl](https://www.youtube.com/@TawanenBxl)
