# UI/UX Revision Requirements

## Goal

Transform the current web marketplace experience into a modern mobile-app-like experience similar to Facebook and leading marketplace applications while preserving the existing branding, functionality, and architecture.

---

## 1. Bottom Navigation

Move the primary navigation from the top to a fixed bottom navigation bar.

Requirements:

- Fixed at bottom.
- Mobile-first.
- Active tab highlighting.
- Smooth transitions.
- Home.
- Stores.
- Categories.
- Cart.
- Profile.

---

## 2. Auto Hide / Show Navigation

Implement Facebook-style behavior.

When scrolling down:

- Hide top navigation.
- Hide secondary navigation if applicable.

When scrolling up:

- Show navigation again.

Requirements:

- Smooth animation.
- No layout shifting.
- Native-app feeling.

---

## 3. Swipe Gesture Support

Implement swipe navigation.

Requirements:

- Swipe from left edge to right.
- Navigate back to Home.
- Available from all sections.
- Must not conflict with horizontal carousels.

---

## 4. Splash & Loading Experience

Current loading state should be replaced with a premium experience.

Requirements:

- Brand logo.
- Skeleton loading.
- Fade transitions.
- Native-app feel.

---

## 5. Hero Section

The hero image/video should start at the very top of the viewport.

Requirements:

- Full bleed.
- Edge-to-edge.
- No top spacing.
- Mobile optimized.

Navigation should still hide on scroll down and reappear on scroll up.

---

## 6. Categories Redesign

Categories should appear directly below the hero section.

Requirements:

- Two horizontal rows.
- Horizontally scrollable.
- Touch friendly.
- Snap scrolling.
- Better spacing.

---

## 7. Featured Stores

Redesign Featured Stores section.

Requirements:

- Horizontal carousel.
- Swipe support.
- Modern cards.
- Smooth snapping.

Store card should contain:

- Image.
- Name.
- Rating.
- Delivery time.
- Description.

---

## 8. Product Cards

Redesign product cards.

Each product card should contain:

### Store Information

- Store name.
- Follow button.

### Product Information

- Product category.
- Product name.
- Short description.

### Pricing

- Original price.
- Discounted price.
- Discount percentage.

### Actions

- Add to cart.
- Wishlist.

### Additional

- Rating.

---

## 9. Mobile App Experience

The website should feel like a native mobile application.

Focus on:

- Smooth animations.
- Touch interactions.
- Gesture support.
- Mobile-first layouts.
- High-performance rendering.
- Modern UX patterns.

---

## Technical Requirements

- Preserve existing functionality.
- Preserve branding.
- Reuse existing components when possible.
- Production-ready implementation.
- Responsive across mobile devices.
- Avoid layout shifts.
- Optimize performance.
- Follow framework best practices.