# Backlog

## High Priority

- [ ] **Rotate Turso `DATABASE_AUTH_TOKEN`** — the token in `.env.local` is a live read-write credential. Rotate immediately and store via Vercel env vars only.
- [ ] **Add `focus-visible` ring styles** to all interactive elements (buttons, links, inputs). Currently `focus:outline-none` is used without a compensating visible focus indicator, breaking keyboard navigation.
- [ ] **Add success feedback** after admin project create/update — the form redirects silently with no confirmation banner or toast.

## Medium Priority

- [ ] **Migrate `<img>` to `<Image />`** across all components (6 instances) for automatic optimization, lazy loading, and layout shift prevention.
- [ ] **Add aria associations** to form validation errors in `ProjectForm.tsx` — connect error `<p>` to inputs via `aria-describedby` for screen reader announcements.
- [ ] **Add skip-to-content link** in the root layout for keyboard users.
- [ ] **Fix "Featured Project" label** on `ProjectCard.tsx` — already fixed to conditionally render based on `project.featured`. Verify behavior on all-project listing pages.
- [ ] **Add `aria-label`** to the `<nav>` element in `Header.tsx`.

## Low Priority

- [ ] **Swap `confirm()` dialog** in `DeleteButton.tsx` for a custom `<dialog>` component for consistent cross-browser styling and accessibility.
- [ ] **Handle header nav overflow** on very small viewports (<360px) with a responsive menu.
- [ ] **Add tech stack input validation** — warn if a tech name contains a comma (current split logic can't handle it).
- [ ] **Truncate auto-generated slugs** to 120 chars in `lib/actions/project.ts` to match schema constraint.
- [ ] **Consider darkening `--color-vibe-muted`** slightly for better WCAG AA contrast margin.
- [ ] **Return structured error states** from server actions instead of silent `null` on auth failures.
