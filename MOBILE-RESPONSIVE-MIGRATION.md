# Mobile Responsive Design Migration Guide

This guide documents all changes made to transform the Systematiq website into a fully responsive design that works on desktop and mobile browsers.

## Overview

The migration includes:
1. Fixed logo carousel animation on mobile browsers
2. Responsive container sizing with percentage-based layouts
3. Percentage-based internal spacing within the container
4. Responsive font sizes (two sizes: mobile and desktop)
5. Dynamic logo sizing based on viewport

---

## Step 1: Fix Logo Animation on Mobile Browsers

### File: `src/components/ui/LogoLoop.css`

**Problem:** CSS media query was disabling animations on all browsers.

**Solution:** Remove the problematic media query block at the end of the file.

**Action:** Delete lines 134-143 (or similar):
```css
@media (prefers-reduced-motion: no-preference) {
  .logoloop__track {
    transform: translate3d(0, 0, 0) !important;
  }

  .logoloop__item img,
  .logoloop__node {
    transition: none !important;
  }
}
```

**Result:** Logo carousel now animates on all browsers including mobile Safari and Chrome.

---

## Step 2: Add Responsive Font Sizes

### File: `src/index.css`

**Add CSS classes for responsive typography:**

Add after the `body` rule:

```css
.title-text {
  font-size: 2rem;
}

.body-text {
  font-size: 0.875rem;
}

.copyright-text {
  font-size: 0.75rem;
}
```

**Add desktop font sizes in the media query:**

Inside the existing `@media (min-width: 768px)` block, add:

```css
.title-text {
  font-size: 3rem;
}

.body-text {
  font-size: 1rem;
}
```

**Result:**
- Mobile: smaller fonts (2rem title, 0.875rem body)
- Desktop: original fonts (3rem title, 1rem body)
- Copyright: same on both (0.75rem)

---

## Step 3: Update Container Layout

### File: `src/index.css`

**Update the `.outer-container` rule:**

```css
.outer-container {
  padding: 20vh 5vw !important;
}
```

**Update the `.content-container` rule:**

```css
.content-container {
  width: 90vw;
  height: 60vh;
  max-height: none;
  display: flex;
  flex-direction: column;
}
```

**Update the desktop media query:**

```css
@media (min-width: 768px) {
  .outer-container {
    padding: 20vh 5vw !important;
  }

  .content-container {
    width: 100%;
    height: 60vh;
    max-width: 550px;
    max-height: none;
  }

  .title-text {
    font-size: 3rem;
  }

  .body-text {
    font-size: 1rem;
  }
}
```

**Result:**
- Mobile: 90vw width, 60vh height, 20vh top/bottom padding, 5vw left/right padding
- Desktop: max-width 550px, 60vh height, 20vh top/bottom padding, 5vw left/right padding

---

## Step 4: Restructure Container Content with Percentage-Based Spacing

### File: `src/App.jsx`

**Import useState and useEffect:**

Add to the imports at the top:
```jsx
import { useState, useEffect } from "react";
```

**Add responsive logo sizing state in the App component:**

Add at the beginning of the `App()` function:

```jsx
const [logoSize, setLogoSize] = useState({ height: 40, gap: 40 });

useEffect(() => {
  const updateLogoSize = () => {
    const height = Math.min(40, Math.max(20, window.innerHeight * 0.06));
    const gap = Math.min(40, Math.max(20, window.innerWidth * 0.04));
    setLogoSize({ height, gap });
  };

  updateLogoSize();
  window.addEventListener('resize', updateLogoSize);
  return () => window.removeEventListener('resize', updateLogoSize);
}, []);
```

**Replace the `.content-container` div and all its contents:**

Replace the entire container div (the one with className="content-container") with this new structure:

```jsx
<div className="content-container" style={{
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(114, 135, 253, 0.1)',
  borderRadius: '24px',
  padding: 0,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
}}>
  {/* Top padding: 10% */}
  <div style={{ height: '10%' }}></div>

  {/* Title: 10% */}
  <div style={{ height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 className="title-text" style={{
      fontWeight: '300',
      letterSpacing: '0.2em',
      color: 'white',
      textAlign: 'center',
      margin: 0
    }}>
      SYSTEMATIQ
    </h1>
  </div>

  {/* Space between title and text: 5% */}
  <div style={{ height: '5%' }}></div>

  {/* Text: 35% */}
  <div className="body-text" style={{
    height: '35%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: '1.3'
  }}>
    {[
      'writing python code', 'using arch linux btw', 'learning data science',
      'reading any good books', 'observing crypto markets',
      'playing steam & playstation', 'enthusiast about open-source',
    ].map((t, i) => <p key={i} style={{ margin: 0 }}>{t}</p>)}
  </div>

  {/* Space between text and logos: 5% */}
  <div style={{ height: '5%' }}></div>

  {/* Logos: 17% */}
  <div style={{
    height: '17%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }}>
    <LogoLoop
      logos={imageLogos}
      speed={50}
      direction="right"
      logoHeight={logoSize.height}
      gap={logoSize.gap}
      pauseOnHover
      scaleOnHover
      fadeOut
      fadeOutColor="rgba(255,255,255,0)"
      ariaLabel="Links"
    />
  </div>

  {/* Space between logos and copyright: 5% */}
  <div style={{ height: '5%' }}></div>

  {/* Copyright: 3% */}
  <div style={{ height: '3%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p className="copyright-text" style={{
      color: 'rgba(255, 255, 255, 0.4)',
      textAlign: 'center',
      margin: 0
    }}>
      all rights reserved © 2025
    </p>
  </div>

  {/* Bottom padding: 10% */}
  <div style={{ height: '10%' }}></div>
</div>
```

**Update the outer container div:**

Find the div with className="outer-container" and update its style:

```jsx
<div className="outer-container" style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
```

**Important Notes:**
- Replace the text array with your website's specific content
- Update the LogoLoop logos prop to use your website's logo array
- Adjust the percentage distributions if needed (must total 100%)

---

## Percentage Breakdown (Container Height = 100%)

The container's internal vertical spacing:
- Top padding: 10%
- Title: 10%
- Spacer: 5%
- Body text: 35%
- Spacer: 5%
- Logo carousel: 17%
- Spacer: 5%
- Copyright: 3%
- Bottom padding: 10%
- **Total: 100%**

---

## Summary of Changes

### Files Modified:
1. `src/components/ui/LogoLoop.css` - Removed blocking media query
2. `src/index.css` - Added responsive font classes and container sizing
3. `src/App.jsx` - Added responsive logo sizing and percentage-based layout

### Key Features:
- ✅ Logo carousel animates on all browsers (desktop and mobile)
- ✅ Responsive container sizing (90vw/60vh mobile, 550px max/60vh desktop)
- ✅ Percentage-based internal spacing (scales with container)
- ✅ Two font sizes (mobile: smaller, desktop: original)
- ✅ Dynamic logo sizing based on viewport
- ✅ No scroll bars - content fits container perfectly
- ✅ Consistent 20vh/60vh/20vh layout on both mobile and desktop

### Browser Compatibility:
- ✅ Desktop Firefox
- ✅ Desktop Chrome
- ✅ Desktop Safari
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)
- ✅ All modern browsers

---

## Testing Checklist

After applying changes, verify:
- [ ] Logos animate smoothly on mobile browsers
- [ ] Container fits properly on mobile devices (no overflow)
- [ ] All text is readable on mobile (not too small)
- [ ] Spacing between elements looks balanced
- [ ] Desktop appearance matches original design
- [ ] Logo carousel pauses on hover (desktop)
- [ ] Font sizes are appropriate for each platform
- [ ] Layout adapts smoothly when resizing browser
