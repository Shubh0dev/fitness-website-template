# AGENTS.md: Karma by Satwik website

One-page site for Karma by Satwik, a unisex fitness and wellness studio with four centres in Kanpur (https://karmabysatwik.com/). Built from the 8B "Arcline" template (original preserved at git tag `arcline-original`). No build step.

## Files
- `index.html`: page, inline CSS in `@layer`s, section scripts, GSAP scenes.
- `js/knowledge.js`: the assistant's knowledge base (every fact it can say). `js/assistant.js`: matching and UI only.
- `assets/vendor/`: GSAP 3.13.0, ScrollTrigger, Lenis 1.3.27, self-hosted (no runtime third-party requests).
- `assets/img/`: client photos as WebP at several widths (`<slug>-<width>.webp`). `assets/brand/`: logo masks, favicons, og-image. `assets/fonts/`: self-hosted Bricolage Grotesque and Geist (latin).
- `robots.txt`, `sitemap.xml`: assume the site is served at https://karmabysatwik.com/ root.
- Upload all of the above plus LICENSE and CREDITS.md; not this file, README.md or `previews/`.

## Facts: the only sources
Every client fact comes from karmabysatwik.com (checked 23 Oct 2026) or the client. Never invent prices, timings, trainer names or qualifications, offers, ratings, review counts, member results or facilities. Unknowns are answered with "ask the team", never guessed. Pending client confirmation (do not "fix" silently):
- Kidwai Nagar address: homepage says "133/130, M Block, Kidwai Nagar, near South X Mall"; other pages say "Building Number 1 Anandpuri, Kidwainagar, near South X Mall". The homepage version is used.
- Birhana Road number ("24/49" used), second phone 077549 96981 and email info@karmabysatwik.com (not used), whether Shyam Nagar is still open, Aqua Zumba venue.
- Trial offer: "free trial session" with intake, assessment, goal setting, plus "free diet chart on visit" are used; "free month" is not.
- Reviews are public Google reviews quoted from the old homepage widget: get the studio's OK before launch. Quote them word for word; mark any cut with " … "; drop a review rather than reword it.
- Photos are the client's own, downloaded from their site: get written approval and originals. No video exists yet.

## Keep
- Every `id`, `data-8b-section`, `data-8b-motion`, `data-8b-part` (internal hooks from the template; not visible). Template branding was removed at the owner's request; keep LICENSE (MIT notice) and the one-line source note in the header comment.
- In-page anchors land below the fixed header through `html { scroll-padding-top }` only; Lenis reads it too, so never add a Lenis/scrollTo offset on top.
- Hover lifts on elements that GSAP also moves use the CSS `translate` property, not `transform`, so CSS transitions never fight GSAP.
- Theme: inline `<head>` script sets `html[data-theme]` from `localStorage['karma-theme']` or the system setting before paint. Tokens live in `data-8b-part="tokens"`: light in `:root`, dark in `:root[data-theme="dark"]` and again in the `prefers-color-scheme` block (no-JS fallback). Change a colour in all three places. Semantic tokens: `--bg --bg-2 --surface --surface-2 --ink --ink-2 --ink-3 --line --accent --accent-hi --on-accent --accent-ink --logo --focus --danger --strong --strong-2 --on-strong --on-strong-2 --strong-line`. Text pairs are ≥ 5.5:1; keep body text ≥ 4.5:1.
- The logo is a CSS mask (`.m-mark`, `assets/brand/karma-mark-mask.png`) filled with `--logo`/`--accent`; recolour through tokens, not new images.
- `style="--len:N"` on display lines = characters in that line incl. spaces and punctuation ("Life is a" 9, "boomerang." 10, "Fitness is" 10).
- Programme names in `data-programme`, the form's programme `<option>`s and `KARMA_KB.programmes[].name` must match exactly; centre names likewise (`data-centre`, centre options, `KARMA_KB.centres[].name`).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__bar` `.nav__menu` `.menu` `.menu__close` `.nav__links a`
  - `section-script:theme`: `.theme-toggle`
  - `scene:opening`: `.op-s1` `.op-line--1` `.op-line--2` `.op-line` `.op-eyebrow` `.op-meta` `.op-float` `.op-float__tilt` `.op-scroll` `.op-photo` `.op-photo__depth` `.op-enso` `.op-slide` `.op-dim` `.op-ground` `.op-card` `.op-title2` `.op-enso2` `.op-chip`
  - `scene:ticker`: `.tk-track`; `scene:approach`: `.ap-title` `.ap-gap` `.ap-chip` `.ap-after` `.ap-mark`
  - `scene:programmes` / `section-script:programmes`: `.pg-card` `.pg-in` `.pg-filter button[data-group]` `.pg-live`
  - `scene:why`: `.wy-stage` `.wy-lens` `.wy-ring` `.wy-note` `.wy-glow`; `scene:founder`: `.fo-visual` `.fo-disc` `.fo-enso` `.fo-photo`; `scene:faq`: `.fq-rail` `.fq-ball` `.fq-list` `.fq-item`
  - `section-script:enquiries` (both forms): `form[data-enquiry="trial|franchise"]` `.tr-status` `.tr-submit` `.tr-privacy`, each field's `aria-describedby` error element, `[data-programme]` `[data-centre]` (trial) and `[data-budget]` (franchise package buttons)
  - `js/assistant.js`: `#assistant` `.as-fab` `.as-panel` `.as-log` `.as-form` `.as-close`
- With reduced motion the page must read in full (no Lenis, no scroll scenes); without the CDN or without JS, content, theme, form hand-off and assistant (JS only) must still work.

## Franchise section
`#franchise` mirrors karmabysatwik.com/franchise: offer, two packages (₹ figures marked * as published), support, who it suits, requirements, an enquiry form (`#franchise-form`: name, mobile, email, city, budget) and the brochure link https://drive.google.com/file/d/1De1wAvCjakTErEVmLcDR4cKuuY9K2FYd/view?usp=sharing (section buttons, under the form, footer, assistant). Budget options must match the package buttons' `data-budget`. The ₹ sign comes from the latin-ext font files, loaded only when it appears.

## Enquiry forms
No backend. Both forms work the same way. With `data-endpoint=""` the form validates (name, 10-digit Indian mobile, centre, programme) and opens WhatsApp to +91 95061 54321 with the details prefilled; it never claims the enquiry was sent. To also receive enquiries by email, set `data-endpoint` on `.tr-form` (and `data-access-key` for Web3Forms) as the comment above the form shows: the script then POSTs `FormData`, shows Sending / success only on HTTP 2xx / error with WhatsApp fallback, 12 s timeout, `botcheck` honeypot.

## Assistant
Scripted, labelled "not AI", no network, no storage. `#assistant` stays hidden until `assistant.js` sets `data-ready`, so a failed script never leaves a dead button; if `knowledge.js` fails it still offers WhatsApp and a call. Replies are queued. On phones the button is tucked (`data-tucked`) until the first screen scrolls away; on touch screens opening it focuses Close, not the text box. Add answers in `js/knowledge.js` (`faqs[].words` are lower-case phrases). Health-condition words always get the doctor/trainer referral. A live AI version needs a server route with the key in an environment variable and the owner's approval of provider and cost.

## Check
320, 375, 768, 1024, 1440 and 2560 px (content column caps at 1680 px); light and dark; reduced motion; console clean; every image loads; `data-programme`/`data-centre` values exist as options.
