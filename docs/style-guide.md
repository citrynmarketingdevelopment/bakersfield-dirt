# Bakersfield Dirt style guide

Use the visual language of the Trends marketing site. Its fixed dark header, condensed uppercase headlines, warm white type, fine rules and strong red actions give the pages a recognizable rhythm. For Bakersfield Dirt, the subject of the photography changes everything. Show a loaded truck beside a cut slope on Home, the grain and scale of each material on Services, and the people coordinating the work on About.

## Visual foundations

| Element | Direction for Bakersfield Dirt |
| --- | --- |
| **Surfaces** | Use Trends midnight `#09090A` for the page and header, carbon `#121011` for alternating sections, and raised charcoal `#191416` for inset panels. Separate surfaces with a 1px champagne rule at about 22% opacity. |
| **Type and actions** | Warm bone `#F2EEE6` for primary text, muted stone `#AAA198` for supporting copy and champagne `#C7AD7B` for small labels on dark surfaces. Reserve red `#C81D2B` with white text for the main action. The quote form sits on a raised charcoal panel with dark fields, warm bone text and a champagne focus state, as on the Trends contact page. |
| **Typography** | Follow the actual Trends marketing shell. Use **Barlow Condensed** at 700–800 for display text and **Manrope** for paragraphs, links and form controls. Use **DM Mono** for small uppercase labels, numbering and breadcrumbs, matching the Trends label style. |
| **Type scale** | Start hero headlines at `clamp(3rem, 8vw, 8rem)` and section titles at `clamp(2rem, 5vw, 4.5rem)`. Set short display lines tightly, around 0.95–1.05 line height. Keep paragraphs in sentence case at 1rem or larger with 1.6 line height and roughly 60 characters per line. |
| **Grid and spacing** | Align the header, content and footer to a common 90rem maximum width. Use the Trends gutter of `clamp(1.25rem, 4vw, 4.5rem)`. Space related items by 0.5–1.5rem, material groups by 2–3rem, and major sections by `clamp(4rem, 8vw, 8rem)`. Keep corners square on photographs and subtly rounded on controls, up to 0.25rem. |
| **Photography** | Use wide jobsite views for context and tightly cropped material photos for identification. Place the hero heading over the quiet side of the frame with a localized dark gradient. Preserve natural color in catalog images so sand and base rock are distinguishable. Use text labels for every material. |

## Shared components

| Component | Appearance and behavior |
| --- | --- |
| **Header and navigation** | Keep the Bakersfield Dirt wordmark left and Home, About, Services and Contact right. Finish with a red **Request a quote** link to the inquiry section on Contact. Use a compact dark header with a fine lower rule and give the current page a visible underline. **Services** opens a menu on hover or with its chevron button: the four services as image cards linking to their anchors, plus a list of the six materials. On phones, Services expands in place inside the full-screen menu. Escape closes either panel and returns focus to its control. |
| **Hero and section heading** | Set one HTML page title against a jobsite image on Home. A possible headline is “Dirt delivery & haul-away in Bakersfield.” Give Services and About shorter openings. On Contact, put the phone number and inquiry within the first screen when space allows. A section heading may pair a large title on the left with one explanatory sentence on the right. Stack them in reading order on mobile. |
| **Buttons and text links** | Reuse the existing Button for the filled red primary action and an outlined secondary action such as **Browse materials**. Use links for navigation and telephone numbers, and a native submit button for the form. Give controls a minimum height of 3rem, a clear hover state and an offset focus ring that contrasts with its surface. |
| **Service index and material cards** | On Home, show direct links to dirt delivery and haul-away. On Services, the four sections are anchor targets reached from the Services menu, the footer and Home. Show delivery and haul-away as a mirrored pair with a grading cross-section for each direction, the materials as a catalog with a sticky index, and trucking with line drawings of each truck type and how it unloads. Use the Trends image-card composition for material families, with a legible title at the lower edge and practical buying details beneath. Set scroll offsets so the fixed header clears anchor targets. |
| **Quote panel and form** | A dark callout pairs **Request a quote** with the click-to-call number. On Contact, keep the dark surface and group the form into numbered steps. Use persistent labels, visible units beside quantity, full-width controls on small screens, inline errors tied to their fields and a clear confirmation after successful submission. Use the inquiry choices in the company brief. |
| **Footer** | Build on the Trends column layout with three groups: company name and service area, the four site links, and direct contact details. Stack in that order on phones. Use the same width and divider treatment as the header. |

## Interaction and implementation

Keep ordinary scrolling. A short 160–220ms color or border change is enough feedback for links and cards. Keep all text and destinations available at rest. Under reduced motion, remove movement. The mobile menu needs keyboard operation, an explicit close control, Escape support and focus returned to the opener. Include a skip link and check navigation, anchors and form fields at 320px wide and at 200% zoom.

Within the existing Next.js project, put palette, spacing, type and layout variables in `src/app/globals.css`. Keep Header, Footer and Button styles in their existing vanilla CSS files, imported through the root layout. Scope new selectors to their component, for example `.material-card__title`. Render content and links as Server Components and keep any client-side menu or form behavior local to that control. Size responsive images for their slots and reserve their aspect ratios while loading.

## Reference points

Paths below are relative to the local reference project at `D:\Projects\trends-frontend`.

- `src/components/marketing-site/marketing-shell.tsx` defines the fonts used by marketing pages and the footer hierarchy.
- `src/components/marketing-home/marketing-home.module.css` defines the live palette, gutter, header, display type and button treatments.
- `src/components/marketing-site/marketing-site.module.css` shows the interior-page hero composition and responsive grids.
- `artifacts/navigation-service-refresh/service-cards-desktop.png` and `mobile-menu-final.png` in the same folder show the card treatment and mobile navigation.

The static jobsite hero, cut-to-fill diagram and single-page material catalog are proposed adaptations for this project. Page purposes, material names and quote details are in the [company brief](company.md).
