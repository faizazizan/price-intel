# PriceIntel

Unified Pricing & Profit Intelligence tool built with Eleventy and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Development

The development server will start on `http://localhost:8080` by default.

- **Eleventy** watches for changes to `.njk`, `.md`, and `.html` files
- **Tailwind CSS** watches for changes and rebuilds styles automatically

## Project Structure

```
price-intel/
├── src/
│   ├── _includes/
│   │   ├── layout.njk       # Base layout
│   │   ├── navbar.njk       # Navigation component
│   │   └── footer.njk       # Footer component
│   ├── calculators/
│   │   ├── ecommerce.njk    # Main unified calculator
│   │   ├── pricing.njk      # Smart pricing suggestions
│   │   ├── breakeven.njk    # Breakeven analysis
│   │   └── markup-margin.njk # Markup & margin calculator
│   ├── assets/
│   │   ├── js/
│   │   │   ├── costBuilder.js   # Core cost calculation
│   │   │   ├── pricingEngine.js # Pricing recommendations
│   │   │   ├── margin.js        # Markup & margin calculations
│   │   │   ├── breakeven.js     # Breakeven calculations
│   │   │   └── ui.js            # UI helpers
│   │   └── css/
│   │       └── tailwind.css     # Tailwind styles
│   └── index.njk            # Homepage
├── _site/                   # Build output (generated)
├── .eleventy.js            # Eleventy config
├── tailwind.config.js      # Tailwind config
└── package.json
```

## Features

### 1. Unified Cost Builder
Calculate true costs including:
- Product cost
- Platform fees (Shopee, Lazada, TikTok Shop)
- Logistics
- Ads cost per unit
- Payment gateway fees
- Wastage
- Monthly fixed costs

### 2. Smart Pricing Engine
Get 3 pricing recommendations:
- **Conservative** (20% margin) - Low risk, faster sales
- **Balanced** (35% margin) - Optimal for most scenarios
- **Aggressive** (50% margin) - Maximum profit per unit

### 3. Breakeven Calculator
Know exactly how many units to sell to cover costs with:
- Daily/weekly/monthly breakeven targets
- Revenue targets
- Profit projections

### 4. Markup & Margin Calculator
Understand the difference and calculate both ways:
- Calculate from cost & price
- Calculate price from desired markup
- Calculate price from desired margin

## Deployment

### Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `_site`

### GitHub Pages
1. Run `npm run build`
2. Push the `_site` folder to `gh-pages` branch

### Vercel
1. Import your repository
2. Build command: `npm run build`
3. Output directory: `_site`

## Technical Details

- **Framework**: Eleventy (11ty) v2.0+
- **Styling**: Tailwind CSS v3.4+
- **JavaScript**: ES Modules (client-side only)
- **Templates**: Nunjucks
- **No backend**: All calculations run in the browser
- **No data collection**: Complete privacy

## Browser Support

Modern browsers with ES Module support:
- Chrome/Edge 61+
- Firefox 60+
- Safari 11+

## License

MIT
