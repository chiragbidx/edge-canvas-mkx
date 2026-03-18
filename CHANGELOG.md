# Changelog

## [2026-04-21] FlickVault Initial Branding & Movie Rental Scaffolding

- Rebranded the full app to "FlickVault", a movie rental platform—homepage, dashboard, emails, and content.
- Replaced all references to "Panda" and generic SaaS language with FlickVault and movie-specific copy.
- Updated `content/home.ts` with FlickVault copy, brand, owner contact, and relevant feature/FAQ/pricing/testimonial content.
- Updated `components/layout/navbar.tsx` to show FlickVault brand, navbar actions, and landing links.
- Updated `components/home/LayoutFooterSection.tsx` for FlickVault, Chirag Dodiya contact, and app branding.
- Updated `app/dashboard/layout.tsx` with FV branding on the dashboard layout.
- Replaced sidebar nav (`components/dashboard/sidebar-nav.tsx`) entries with "Browse Movies", "Your Rentals", "Profile", etc. (retired demo/feature).
- Updated dashboard content (`components/dashboard/dashboard-content.tsx`) to emphasize movie library, rentals, HD streaming—removed non-movie demo content.
- Introduced `/dashboard/movies` page (server/client files):
  - Real CRUD for "Movie" records using the core feature-items table with add/edit/delete, owner/admin restriction.
  - Used "Browse Movies" for main dashboard feature, mapped existing feature scaffold directly.
- Ensured all legal, footer, and contact info now references Chirag Dodiya and chirag@bidx.ai.
- All transactional/auth emails use "FlickVault" as brand, contact, and sending identity.