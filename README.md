# 1Fi Marketplace — SDE Intern Assignment

A standalone React/Vite implementation of the requested 1Fi Shop + Marketplace flow.

## Implemented

- Shop page with:
  - Top Brands (blank as specified)
  - Nearby Stores (blank as specified)
  - 1Fi Marketplace
- Marketplace product listing
- Search and category filtering
- Product image/visuals
- Product name and pricing
- Product variants
- Product details
- EMI plan selection
- Selected-plan summary
- Proceed CTA
- Success/confirmation state
- Responsive mobile/desktop layout
- Mock product/EMI data separated from UI
- Reusable React components
- Empty/no-result state

## Important assumption

The existing 1Fi source codebase was not provided with this submission, so this is a standalone React/Vite implementation based on the written assignment requirements. Once the actual 1Fi repository is available, the UI/components can be migrated into its existing architecture and visual system.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Data

Product and EMI data lives in `src/data.js`. The UI consumes that data rather than hardcoding product values inside components, making it straightforward to replace the mock source with an API.

## Notes

EMI figures are illustrative mock data for the assignment. No real payment, lending, or purchase is performed.
