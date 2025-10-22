# Visibility Boost

A single-page web experience designed to help small and medium-sized e-commerce businesses, restaurants, and boutiques improve their online visibility and brand image. The platform provides guided onboarding, business profile management, SEO insights, analytics dashboards, AI-assisted branding support, and beautiful showcase pages.

## Features

- **Hero dashboard** with quick access to onboarding, analytics, and branding tools.
- **Business profile manager** to store key details, offers, and links for every storefront.
- **SEO & local visibility cockpit** highlighting keyword opportunities, structured data, and review insights.
- **Performance analytics** with traffic and conversion charts powered by Chart.js.
- **AI branding studio** that generates campaign ideas, slogans, and next-best actions using templated AI logic.
- **Showcase mini-sites** that transform each business profile into a shareable marketing page.

All data is stored locally in the browser so you can experiment freely without a backend.

## Getting started

1. Open `index.html` in your preferred browser.
2. Explore the guided onboarding checklist and review the example businesses.
3. Add your own business details or update the samples using the profile manager form.
4. Generate AI-powered campaign concepts from the branding studio and copy schema markup for your site.

> **Tip:** Because there is no server-side code, the project can be hosted statically on any platform (GitHub Pages, Netlify, Vercel, etc.).

## Tech stack

- HTML5, CSS3, and vanilla JavaScript modules
- [Chart.js](https://www.chartjs.org/) via CDN for interactive analytics visualizations
- LocalStorage for persisting business details between sessions

## Folder structure

```
.
├── index.html
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       └── app.js
└── README.md
```

## Future enhancements

- Connect to live Google Business Profile, Yelp, or Meta APIs for real data ingestion.
- Replace the rule-based AI assistant with an actual LLM-powered service.
- Add authentication and multi-user workspaces so agencies can manage multiple clients securely.
- Integrate automated email and SMS campaigns using marketing automation APIs.
