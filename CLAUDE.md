# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio landing page built with React 19 + Vite 7, featuring animated visual effects and a glassmorphism design. The site displays personal branding ("SYSTEMATIQ") with an animated background and a carousel of social media links.

## Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Architecture

### Component Structure

The application follows a simple three-component architecture:

**App.jsx (Main Component)**
- Root component that orchestrates the layout
- Uses inline styles instead of Tailwind classes for precise glassmorphism effects
- Combines LetterGlitch background with centered content card
- Contains hardcoded social media links array (`imageLogos`) with 15 platforms

**LetterGlitch Component** (`src/components/ui/letter-glitch.jsx`)
- Canvas-based animated background effect
- Uses refs for animation state (`letters`, `grid`, `animationRef`)
- Grid-based rendering system that calculates letter positions based on character dimensions (10px width × 20px height)
- Supports smooth color interpolation when `smooth=true` via RGB transition calculations
- Performance: Updates 5% of letters per frame using `requestAnimationFrame`
- Key props: `glitchSpeed`, `glitchColors`, `smooth`, `centerVignette`, `outerVignette`

**LogoLoop Component** (`src/components/ui/LogoLoop.jsx`)
- Infinite carousel/marquee animation using CSS transforms
- Dynamically calculates number of copies needed based on container width to ensure seamless looping
- Uses `requestAnimationFrame` for smooth 60fps animation with exponential easing (`SMOOTH_TAU = 0.25`)
- ResizeObserver pattern for responsive updates
- Image lazy loading with load event tracking
- Key props: `speed`, `direction`, `pauseOnHover`, `scaleOnHover`, `fadeOut`

### Styling Approach

- **Tailwind CSS 4.1.15** is configured but rarely used in components
- Components prefer inline styles for precise control over glassmorphism effects
- Color palette: Blue/purple theme (`#7287fd`, `#2b377d`, `#9dabfc`)
- LogoLoop has dedicated CSS file (`LogoLoop.css`) for animation classes

### Animation Patterns

Both animated components follow similar patterns:
- Use `useRef` to persist state across renders without causing re-renders
- Employ `requestAnimationFrame` for smooth 60fps updates
- Calculate deltas using timestamps for frame-rate-independent animation
- Clean up animations in useEffect return functions

### Image Assets

Logo images are stored in `public/logos/` and referenced with paths like `/logos/mail.png`. When adding new social links, ensure:
1. Logo image is placed in `public/logos/`
2. Image is added to `imageLogos` array in App.jsx
3. Each entry has `src`, `alt`, and `href` properties

## Configuration Notes

- **Vite Config**: Standard React setup with `@vitejs/plugin-react` using Babel for Fast Refresh
- **Tailwind Config**: Configured to scan `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`
- **Font**: Uses "Exo" Google Font (loaded via index.css)
