# Bookshelf Social

Warm, editorial social discovery through books. This is a deployable P0 preview, not a connected social network.

## Implemented
- 15 labeled fictional profiles, with real books and ISBN-normalized identity.
- Photo selection, drop zone, validated private uploads (JPEG/PNG/WebP, 5 MB).
- Explicit sample mode; searchable Open Library metadata; manual addition/correction/removal, reading status and favorites.
- Optional server-side vision recognition via Responses API, returning candidate catalog matches for user confirmation. No recognition runs or is represented as successful without a configured key.
- Profile and image persistence in hosted D1/R2, with Sites-authenticated ownership and private/public profile visibility.
- Weighted matches: 50% Sørensen–Dice book overlap, 30% interest Jaccard, 20% topic-frequency cosine. Topic cosine is a transparent approximation, not a pretrained embedding model. Collection duplicates are removed, empty scores are zero and fewer than five books is low-confidence.
- Book Twins, Idea Neighbors, Different Perspectives; searchable and filterable exploration; counts from stored and demo profiles.
- Stable `/profile/:id` and `/compare/:a/:b` pages, private access checks, card downloads and explicit X draft sharing.
- Generated profile PNG cards stored alongside photos and included in Open Graph metadata.
- Reduced motion, keyboard controls, responsive layouts, native modal focus handling.

## Preview boundaries

The site is publicly accessible at https://bookshelf-social-curiosity.deep-hake-5516.chatgpt.site/. Account-owned operations still require Sites sign-in. Profile visibility controls discovery within the site.

Source is mirrored to GitHub. Production hosting remains on Sites with Cloudflare Workers, D1, and R2; a GitHub push alone does not trigger deployment. GitHub Pages cannot run this application’s server routes or storage bindings.

The requested Supabase project credentials were not supplied. The hosted preview uses D1/R2 and Sites sign-in. Supabase Auth/database/storage and RLS migration are still required for the requested production stack. Do not mistake the preview storage for a Supabase integration.

Live AI has not been credentialed or integration-tested. Set `OPENAI_API_KEY` as a server runtime secret and optionally `OPENAI_MODEL` (default `gpt-6-astra`) to enable vision. The API key never reaches the browser. Configure the key through the OpenAI Developers plugin, then Sites runtime secrets. Recognition requires sign-in and explicit upload action.

Live discussion invitations, accepted private threads, notifications, follow relationships, blocking/reporting, and AI-written explanations are not connected. No fake messages or invitations are generated. Explanation and icebreaker text is deterministic and labeled. Saved shelf favorites are device-local bookmarks, not social follows.

Basic validation, ownership authorization, origin checks, upload signatures and durable per-user hourly rate limits are implemented. Full production content moderation/abuse operations require further integration; this P0 preview is not a fully operational social network.

## Local development

`npm run dev` runs Vinext (Next.js App Router APIs) through Vite. `npm run build` builds the Worker. `npm run db:generate` generates D1 migrations. Apply pending migrations to the built Wrangler configuration using the documented Sites workflow. `npm run start` previews the built Worker. `npx tsc --noEmit` checks TypeScript. `node --experimental-strip-types tests/matching.test.ts` runs scoring tests.

## Assets and APIs

Photography is illustrative and does not represent the fictional book collections. Source: Unsplash photo IDs `1593430980369-68efc5a5eb34`, `1507842217343-583bb7270b66`, and `1524578271613-d550eacf6090`. Metadata and covers: Open Library. Fonts: Google Fonts (DM Sans and Libre Caslon Display) with system fallbacks.
Vision implementation reference: https://developers.openai.com/api/docs/guides/images-vision
