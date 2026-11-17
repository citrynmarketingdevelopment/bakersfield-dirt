# Bakersfield Dirt

Four public pages for material sales, dirt delivery, haul-away and trucking in Kern County. Built with the Next.js App Router, strict TypeScript, pnpm and vanilla CSS.

## Run locally

Use Node.js 22 LTS or newer and the pnpm version in `package.json`.

```sh
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Run `pnpm lint`, `pnpm typecheck` and `pnpm build` to check a change. Use `pnpm start` to serve a production build. Vercel can build the repository with its Next.js preset.

## Quote inquiries

Contact works with a phone number and email address out of the box. The form prepares a draft in the visitor’s email app so they can review and send their job details. Links from Services preselect the service or material.

To enable direct submission, set both `RESEND_API_KEY` and `QUOTE_FROM_EMAIL` in the server environment. The sender must belong to a verified Resend domain. Restart or redeploy with these values. The server sends plain text to the fixed company address in `src/lib/company.ts`. If delivery fails the visitor can retry or send the same details by email.

## Content and assets

- [Company and page plan](docs/company.md)
- [Design guide](docs/style-guide.md)
- Shared services, material descriptions and contact details live in `src/lib/company.ts`.
- Jobsite photography is reused from the [existing website](https://bakersfielddirt.com/). Confirm rights to reuse its Durable/Getty images on the new host before publishing, or replace them with company photography.
- Catalog close-ups illustrate material families. Poly Haven sources are [Dirt Floor](https://polyhaven.com/a/dirt_floor), [Gravel Floor](https://polyhaven.com/a/gravel_floor), [Rocky Gravel](https://polyhaven.com/a/rocky_gravel), [Sand 02](https://polyhaven.com/a/sand_02), [Asphalt 02](https://polyhaven.com/a/asphalt_02) and [Dry River Pebbles](https://polyhaven.com/a/dry_river_pebbles).
- Barlow Condensed, Manrope and DM Mono are served locally. Their licenses are in `public/fonts`.
