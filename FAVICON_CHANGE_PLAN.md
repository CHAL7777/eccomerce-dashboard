# Vite Favicon Change Plan

## Task Overview
Change the Vite favicon from the default vite.svg to cart.png

## Current State Analysis
- Current favicon: `/vite.svg` (referenced in `/index.html`)
- Target favicon: `cart.png` (exists in `/dist/assets/cart.png`)
- Public directory: Empty (`/public/`)
- Build output: `/dist/assets/cart.png` already exists

## Implementation Plan

### Step 1: Copy cart.png to public directory
- Copy `/dist/assets/cart.png` to `/public/cart.png`
- This makes the file accessible at `/cart.png` during development and production

### Step 2: Update index.html favicon reference
- Change `<link rel="icon" type="image/svg+xml" href="/vite.svg" />` 
- To `<link rel="icon" type="image/png+xml" href="/cart.png" />`

### Step 3: Verify the changes
- Test that the favicon loads correctly
- Ensure the build process includes the new favicon

## Files to Modify
1. `/public/cart.png` - Create/copy file
2. `/index.html` - Update favicon link

## Expected Outcome
- Browser tab will display cart.png icon instead of vite.svg
- Favicon will work in both development and production builds
