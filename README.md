# 🎛️ DJ Tools Frontend

A Next.js web application for DJ equipment, tutorials, and wishlist price tracking. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog** – Browse DJ equipment (controllers, monitors, headphones, synthesizers) with current and original pricing.
- **Learning Center** – 8 tutorials spanning Beginner, Intermediate, and Advanced levels across categories such as Fundamentals, Mixing Techniques, Turntablism, Performance, Software, and Production. Each tutorial has its own detail page.
- **Wishlist & Price Alerts** – Add products to a persistent wishlist (stored in `localStorage`). The app checks for price drops every minute and surfaces toast notifications when a tracked product's price falls below its saved price. A "Simulate Price Drop" button is available for testing.
- **Responsive Navigation** – Top navigation bar with mobile hamburger menu linking to Home, Tutorials, Products, and About pages.
- **Alert System** – Global toast notifications (success / info / warning) powered by `AlertContext`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navigation and Providers
│   ├── page.tsx                # Home page (hero, features grid, featured products)
│   ├── tutorials/
│   │   ├── page.tsx            # Tutorial listing with filters and learning path
│   │   └── [slug]/page.tsx     # Individual tutorial detail page
│   └── wishlist/
│       └── page.tsx            # Wishlist page with price-drop simulation
├── components/
│   ├── AlertToast.tsx          # Toast notification UI
│   ├── Navigation.tsx          # Responsive top navigation bar
│   ├── ProductCard.tsx         # Product card with wishlist toggle and price-drop badge
│   ├── Providers.tsx           # Wraps app with AlertProvider and WishlistProvider
│   └── WishlistToggle.tsx      # Heart icon button to add/remove products from wishlist
├── context/
│   ├── AlertContext.tsx        # Global alert/toast state
│   └── WishlistContext.tsx     # Wishlist state, localStorage persistence, price-drop checks
└── lib/
    └── mockData.ts             # Mock product catalogue (Product interface + MOCK_PRODUCTS)
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available scripts:

```bash
npm run build   # Production build
npm run lint    # ESLint
npm start       # Start production server
```

## GitHub Workflows

### Daily Activity Report

The repository includes an agentic daily activity report workflow (`.github/workflows/daily-activity-report.md`). It runs on a schedule (daily around 07:00) and publishes a summary of the last 24 hours of repository activity as a GitHub issue, covering:

- Merged pull requests
- Newly opened and closed issues
- Recent commits on the default branch
- Open PR and issue counts

Issues are labelled `activity-report`, automatically close older reports, and expire after 7 days.

## Tech Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Geist](https://vercel.com/font) font family
