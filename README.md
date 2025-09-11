# BimmerTech – BMW iDrive Coding (Vue 3 + Vite)

Live demo-ready implementation of the **/bmw-idrive-coding** page.

## Features
- **Two-grid filter behavior**: Selected products first, then **Other coding options**.
- **Filters**: Multi-select **categories**, single-select **type**, text search.
- **Sorting**: Default, **Price (high→low)**, **Price (low→high)** applied to *both* grids.
- **Cards & Modal**: Icon, USB/cable pill, price, smallDescription, “+ Select/Remove”, “Learn more” opens detail modal (image/video).
- **Video carousel** for product **868** via `/api2/get-videos` (graceful mock fallback if API not reachable).
- **Category cards carousel** with quick filter + scroll to grid.
- **New navigation**:
  - **Desktop (top)**: All Products dropdown, **VIN** input (17-char decode → tick), Installation, Buy now, Cart (green).
  - **Mobile (bottom)**: Home, Shop, VIN, Installation.
- **VIN logic**: Before VIN → show `showOnStartUp`; after 17-char VIN → show all (compatible) products.
- **Cart tracking** via Pinia (count & total).

## Tech
- Vue 3, Vite, Pinia
- Single CSS with design tokens to match Figma

## Local Setup
```bash
npm install
npm run dev
