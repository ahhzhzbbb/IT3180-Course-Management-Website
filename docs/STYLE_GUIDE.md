# Visual style guide (short)

## Purpose
Polish the UI with a modern, accessible theme while keeping logic unchanged.

## Pages updated
- `Profile` (frontend/src/pages/Profile.jsx + Profile.module.css)
- `Dashboard` (frontend/src/pages/Dashboard.jsx + Dashboard.module.css)
- `Course Detail` (frontend/src/pages/CourseDetail.jsx + CourseDetail.module.css)

## How to review locally
1. From project root:
   - cd frontend
   - npm install
   - npm run dev
2. Open the app at the dev URL (default: `http://localhost:5173`) and navigate to `Profile`, `Dashboard`, and `Course Detail` routes.
3. Verify:
   - Layout is responsive (resize window to mobile / tablet widths).
   - Buttons and interactive elements show a visible focus ring when tabbed (use Tab key).
   - Success / error messages appear with left accent and clear contrast.

## Color & typography
- Uses CSS variables in `frontend/src/styles/global.css` for primary/secondary colors, radii and shadows.
- Use `Inter` as the primary font (already imported in global.css).

## Accessibility notes
- Inputs and primary buttons have `:focus-visible` styles for keyboard users.
- Reduced-motion users won't see excessive transitions.
- Use Lighthouse/axe or keyboard-only navigation to validate further.

## Screenshots
- Capture simple screenshots of each page at desktop and mobile widths to include in PR for visual review.

## Follow-ups (optional)
- Add automated visual regression tests (Percy, Chromatic) on CI for future changes.
- Expand style tokens into `theme.css` or a design tokens JSON if needed.