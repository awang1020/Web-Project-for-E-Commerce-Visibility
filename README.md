# Casa Sabor Modular Website

Casa Sabor is a modern Mediterranean restaurant based in Barcelona. This repository now organizes the marketing
site into reusable HTML partials, shared assets, and editable data files so content updates stay fast and
maintainable.

## Project structure

```
.
├── index.html                 # Main entry point that loads each partial dynamically
├── partials                   # Modular HTML sections for the page
│   ├── header.html
│   ├── menu.html
│   ├── about.html
│   ├── visibility.html
│   ├── visit.html
│   ├── contact.html
│   └── footer.html
├── assets
│   ├── css
│   │   └── style.css
│   ├── images                 # Optimized SVG artwork used throughout the site
│   │   ├── hero-paella.svg
│   │   └── menu-item.svg
│   └── js
│       └── app.js
├── data
│   ├── chef.json              # Chef biography, awards, and philosophy
│   ├── contact.json           # Phone, email, address, and social links
│   └── menu.json              # Menu categories, dishes, pricing, and allergen details
└── README.md
```

## Updating content

- **Navigation, hero, and footer:** Edit the corresponding file in `partials/` to adjust copy, links, or layout.
- **Menu items:** Update `partials/menu.html` for layout changes and `data/menu.json` to keep a structured reference
  of dishes, allergens, and pricing.
- **Contact details:** Update the buttons and copy in `partials/contact.html`, then mirror the same values in
  `data/contact.json` for consistency.
- **Chef story:** Modify `partials/about.html` and `data/chef.json` together so on-page and structured content stay
  aligned.
- **Images:** Replace the SVG files (or add new ones) in `assets/images/` and update image paths inside the
  relevant partial.

## Local preview

Because the page fetches partial HTML files, use a lightweight static server while developing:

```bash
npx serve .
```

Any static hosting provider (GitHub Pages, Netlify, Vercel, etc.) can serve the compiled site.

## Accessibility and semantics

- Every partial begins with a descriptive HTML comment so editors can identify sections quickly.
- Semantic elements (`<header>`, `<section>`, `<nav>`, `<footer>`) are preserved in each partial.
- Skip links, aria labels, and screen-reader text remain intact to maintain the original accessibility baseline.
