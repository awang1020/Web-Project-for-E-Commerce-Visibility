const storageKey = "visibilityBoostState";

const defaultBusinesses = [
  {
    id: "luna-bistro",
    name: "Luna & Lattes Bistro",
    category: "Cafe & Brunch",
    location: "Downtown Riverside",
    offer: "Artisanal brunch plates & single-origin coffee",
    voice: "Warm & friendly",
    website: "https://lunaandlattes.example.com",
    social: "@lunaandlattes",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ember-fitness",
    name: "Ember Movement Studio",
    category: "Boutique Fitness",
    location: "Willow Park Arts District",
    offer: "Strength and mobility classes for busy creatives",
    voice: "Bold & energetic",
    website: "https://embermovementstudio.example.com",
    social: "@embermovement",
    image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "flora-bloom",
    name: "Flora Bloom Atelier",
    category: "Boutique Florist",
    location: "Old Town Promenade",
    offer: "Seasonal statement arrangements",
    voice: "Premium & elegant",
    website: "https://florabloomatelier.example.com",
    social: "@florabloomatelier",
    image: "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=600&q=80"
  }
];

const defaultState = {
  businesses: defaultBusinesses,
  selectedBusinessId: defaultBusinesses[0].id,
  completedKeywords: new Set(),
  onboarding: {
    steps: [
      {
        title: "Claim Google Business Profile",
        description: "Connect your profile to sync hours, reviews, and location updates automatically.",
        done: true
      },
      {
        title: "Upload brand visuals",
        description: "Add a logo, hero image, and at least 5 menu/product photos to boost engagement.",
        done: false
      },
      {
        title: "Publish your showcase page",
        description: "Share your mini-site across Instagram, email signatures, and QR menus.",
        done: false
      },
      {
        title: "Activate review responder",
        description: "Let AI draft thoughtful replies to new Google and Yelp reviews in one click.",
        done: false
      }
    ]
  }
};

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return { ...defaultState, completedKeywords: new Set() };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      completedKeywords: new Set(parsed.completedKeywords || []),
      businesses: parsed.businesses?.length ? parsed.businesses : defaultBusinesses
    };
  } catch (error) {
    console.error("Failed to parse saved state", error);
    return { ...defaultState, completedKeywords: new Set() };
  }
}

function saveState() {
  const serializable = {
    ...state,
    completedKeywords: Array.from(state.completedKeywords)
  };
  localStorage.setItem(storageKey, JSON.stringify(serializable));
}

const keywordData = [
  { term: "best brunch downtown", volume: 880, competition: "Medium", action: "Add to homepage H1" },
  { term: "latte art classes riverside", volume: 210, competition: "Low", action: "Create blog guide" },
  { term: "plant delivery old town", volume: 320, competition: "Low", action: "Tag product schema" },
  { term: "mobility classes near me", volume: 590, competition: "High", action: "Launch Google Ads" }
];

const visibilityInsights = [
  "Google Maps views spiked on Saturdays. Add brunch hours to your GBP profile.",
  "Your Instagram bio link has a 4.3% conversion rate. Add a seasonal CTA to increase urgency.",
  "Customers mentioned service speed in 12% of reviews. Highlight recent improvements in replies.",
  "Schema markup detected for 8/12 products. Add high-quality photos to complete the set."
];

const reviewSnapshots = [
  {
    source: "Google Reviews",
    highlight: "Customers love your cozy patio—mention it in every post!",
    score: 4.8
  },
  {
    source: "Yelp",
    highlight: "Respond to 3 recent reviews to stay in the top 3 local rankings.",
    score: 4.5
  },
  {
    source: "DoorDash",
    highlight: "Prep time holds at 18 minutes. Feature fast pick-up in your ads.",
    score: 96
  }
];

const analyticsSeries = {
  traffic: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    values: [620, 740, 880, 1040, 1160, 1390, 1640]
  },
  conversions: {
    labels: ["Website", "Instagram", "Google Maps", "Email", "In-store QR"],
    values: [320, 280, 460, 180, 120]
  }
};

const ideaTemplates = {
  instagram({ business, offer, tone }) {
    const offerText = business.offer || "your signature experience";
    return {
      title: `Instagram carousel: ${business.name}`,
      body: [
        `Slide 1: ${business.voice} welcome headline introducing ${offerText.toLowerCase()}.`,
        `Slide 2: Showcase behind-the-scenes photo with overlay: “Why ${business.location} loves us.”`,
        `Slide 3: Customer quote graphic (⭐️⭐️⭐️⭐️⭐️).`,
        offer ? `Slide 4: Limited-time offer — ${offer}.` : `Slide 4: Invitation to book via ${business.website || "your preferred channel"}.`,
        `Caption idea: ${tone} tone, ask followers to tag a friend for a chance to win a VIP experience.`
      ].join("\n")
    };
  },
  newsletter({ business, offer, tone }) {
    const offerText = business.offer || "your signature experience";
    return {
      title: `${business.name} - inbox spotlight`,
      body: [
        `Opening paragraph (${tone}): Share the story behind your latest ${offerText.toLowerCase()}.`,
        `Middle section: Add a 3-item list of seasonal favorites with emojis.`,
        offer ? `Feature block: Exclusive subscriber perk — ${offer}.` : `Feature block: Invite readers to book a tasting or trial class via ${business.website || "your site"}.`,
        `CTA: Encourage readers to forward to a friend who loves ${business.category.toLowerCase()}.`
      ].join("\n")
    };
  },
  slogan({ business, tone }) {
    return {
      title: `Brand slogan refresh`,
      body: [
        `${business.name}: ${tone === "luxury" ? "Where every detail blooms." : `Your ${
          business.category?.toLowerCase() || "brand"
        } HQ in ${business.location || "town"}.`}`,
        `Alternative: “${(business.offer || "Crafted with care").replace(/^[a-z]/, (ch) => ch.toUpperCase())}."`
      ].join("\n")
    };
  },
  product({ business, offer, tone }) {
    const offerText = business.offer || "your hero product";
    return {
      title: `Product story: ${offerText}`,
      body: [
        `Hook (${tone}): Paint a scene with the senses that highlights your signature offer.`,
        `Feature bullets: Ingredients, preparation, and customer benefit.`,
        offer ? `Closer: Invite readers to redeem ${offer} before it expires.` : "Closer: Encourage pre-orders with a subtle urgency cue."
      ].join("\n")
    };
  }
};

let state = loadState();
let trafficChart = null;
let conversionChart = null;

function renderChecklist() {
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = state.onboarding.steps
    .map(
      (step) => `
        <li class="${step.done ? "done" : ""}">
          <div>
            <h4>${step.title}</h4>
            <p>${step.description}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function renderBusinessList() {
  const list = document.getElementById("business-list");
  list.innerHTML = "";
  state.businesses.forEach((business) => {
    const li = document.createElement("li");
    li.className = "business-card";
    li.dataset.id = business.id;
    li.innerHTML = `
      <header>
        <div>
          <h4>${business.name}</h4>
          <p class="tag">${business.category || "Add category"}</p>
        </div>
        <button class="ghost-btn select-btn" data-id="${business.id}">
          ${state.selectedBusinessId === business.id ? "Selected" : "Set active"}
        </button>
      </header>
      <p>${business.offer || "Add a signature product or service highlight."}</p>
      <div class="contact-links">
        ${business.website ? `<a href="${business.website}" target="_blank" rel="noopener">Website</a>` : "<span>Add website</span>"}
        ${business.social ? `<span>${business.social}</span>` : "<span>Add social</span>"}
      </div>
    `;
    list.appendChild(li);
  });
}

function renderBrandingBusinessOptions() {
  const select = document.getElementById("branding-business");
  select.innerHTML = state.businesses
    .map(
      (business) => `
        <option value="${business.id}" ${state.selectedBusinessId === business.id ? "selected" : ""}>${business.name}</option>
      `
    )
    .join("");
}

function renderKeywordTable() {
  const tbody = document.querySelector("#keyword-table tbody");
  tbody.innerHTML = "";
  keywordData.forEach((row) => {
    const tr = document.createElement("tr");
    const completed = state.completedKeywords.has(row.term);
    tr.innerHTML = `
      <td>${row.term}</td>
      <td>${row.volume}</td>
      <td>${row.competition}</td>
      <td><button class="ghost-btn keyword-btn" data-term="${row.term}">${completed ? "Completed" : "Plan action"}</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderVisibilityInsights() {
  const ul = document.getElementById("visibility-insights");
  ul.innerHTML = visibilityInsights.map((insight) => `<li>${insight}</li>`).join("");
}

function renderSchemaPreview() {
  const business = state.businesses.find((b) => b.id === state.selectedBusinessId) || state.businesses[0];
  if (!business) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: business.image || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location || "",
      addressLocality: business.location || "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "US"
    },
    url: business.website || "",
    sameAs: business.social ? [`https://instagram.com/${business.social.replace(/^@/, "")}`] : [],
    description: business.offer || "Update your offer to describe your signature experience."
  };
  document.getElementById("schema-preview").textContent = JSON.stringify(schema, null, 2);
}

function renderReviews() {
  const list = document.getElementById("review-list");
  list.innerHTML = reviewSnapshots
    .map(
      (review) => `
        <li>
          <strong>${review.source}</strong><br />
          <span>${review.highlight}</span><br />
          <span class="tag">Score ${review.score}</span>
        </li>
      `
    )
    .join("");
}

function renderShowcaseCards() {
  const container = document.getElementById("showcase-list");
  container.innerHTML = "";
  state.businesses.forEach((business) => {
    const card = document.createElement("article");
    card.className = "showcase-card";
    card.innerHTML = `
      <h3>${business.name}</h3>
      <p>${business.offer || "Tell guests what makes you unforgettable."}</p>
      <p class="tag">${business.category || "Add category"}</p>
      <div class="cta">
        <a class="ghost-btn" href="${business.website || "#"}" target="_blank" rel="noopener">Visit page</a>
        <button class="ghost-btn copy-showcase" data-id="${business.id}">Copy share link</button>
      </div>
      <blockquote>“Loved by neighbors in ${business.location || "your city"}.”</blockquote>
    `;
    container.appendChild(card);
  });
}

function buildTrafficChart() {
  if (!window.Chart) return;
  const ctx = document.getElementById("traffic-chart");
  if (!ctx) return;
  if (trafficChart) trafficChart.destroy();
  trafficChart = new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels: analyticsSeries.traffic.labels,
      datasets: [
        {
          label: "Visits",
          data: analyticsSeries.traffic.values,
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.25)",
          tension: 0.35,
          fill: true
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: "#94a3b8" },
          grid: { color: "rgba(148, 163, 184, 0.08)" }
        },
        y: {
          ticks: { color: "#94a3b8" },
          grid: { color: "rgba(148, 163, 184, 0.08)" }
        }
      }
    }
  });
}

function buildConversionChart() {
  if (!window.Chart) return;
  const ctx = document.getElementById("conversion-chart");
  if (!ctx) return;
  if (conversionChart) conversionChart.destroy();
  conversionChart = new Chart(ctx.getContext("2d"), {
    type: "bar",
    data: {
      labels: analyticsSeries.conversions.labels,
      datasets: [
        {
          label: "Conversions",
          data: analyticsSeries.conversions.values,
          backgroundColor: "rgba(34, 211, 238, 0.35)",
          borderRadius: 12
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: "#94a3b8" },
          grid: { display: false }
        },
        y: {
          ticks: { color: "#94a3b8" },
          grid: { color: "rgba(148, 163, 184, 0.08)" }
        }
      }
    }
  });
}

function renderEverything() {
  renderChecklist();
  renderBusinessList();
  renderBrandingBusinessOptions();
  renderKeywordTable();
  renderVisibilityInsights();
  renderSchemaPreview();
  renderReviews();
  renderShowcaseCards();
  buildTrafficChart();
  buildConversionChart();
}

function handleBusinessFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const business = Object.fromEntries(formData.entries());
  const existing = state.businesses.find((b) => b.name.toLowerCase() === business.name.toLowerCase());
  if (existing) {
    Object.assign(existing, business);
    existing.id = existing.id || business.name.toLowerCase().replace(/\s+/g, "-");
    state.selectedBusinessId = existing.id;
  } else {
    const id = business.name ? business.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : `biz-${Date.now()}`;
    state.businesses.push({ ...business, id });
    state.selectedBusinessId = id;
  }
  saveState();
  event.target.reset();
  renderEverything();
}

function handleBusinessSelect(event) {
  const button = event.target.closest(".select-btn");
  if (!button) return;
  state.selectedBusinessId = button.dataset.id;
  saveState();
  renderEverything();
}

function handleKeywordToggle(event) {
  const button = event.target.closest(".keyword-btn");
  if (!button) return;
  const term = button.dataset.term;
  if (state.completedKeywords.has(term)) {
    state.completedKeywords.delete(term);
  } else {
    state.completedKeywords.add(term);
  }
  saveState();
  renderKeywordTable();
}

function handleBrandingGenerate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());
  const business = state.businesses.find((b) => b.id === payload.business) || state.businesses[0];
  const generator = ideaTemplates[payload.contentType];
  if (!business || !generator) return;
  const idea = generator({ business, offer: payload.offer, tone: payload.tone });
  const improvement = buildImprovementSuggestion(payload.goal, business);
  const output = document.getElementById("idea-output");
  output.innerHTML = `
    <article>
      <h4>${idea.title}</h4>
      <p>${idea.body.replace(/\n/g, "<br>")}</p>
    </article>
    <article>
      <h4>Next best action</h4>
      <p>${improvement}</p>
    </article>
  `;
}

function buildImprovementSuggestion(goal, business) {
  const base = business.offer ? business.offer.toLowerCase() : business.category?.toLowerCase() || "your experience";
  const suggestions = {
    awareness: `Add a geo-tagged reel this week highlighting ${base}. Businesses in ${business.location || "your area"} see 25% more reach when they post with neighborhood hashtags.`,
    launch: `Update your showcase page hero image to match the seasonal launch. Cross-post to Google Business Profile with a limited-time CTA.`,
    loyalty: `Segment your past 90-day customers and send a personal thank-you email. Include a VIP early access invite for ${base}.`,
    reviews: `Enable the smart review responder to reply within 2 hours. Add a QR code by checkout inviting guests to share their experience.`
  };
  return suggestions[goal] || "Keep delivering consistent updates across your channels to stay top-of-mind.";
}

function handleCopySchema() {
  const schema = document.getElementById("schema-preview").textContent;
  if (!navigator.clipboard?.writeText) {
    showToast("Clipboard API unavailable", true);
    return;
  }
  navigator.clipboard
    .writeText(schema)
    .then(() => showToast("Schema copied to clipboard"))
    .catch(() => showToast("Unable to copy schema", true));
}

function handleCopyIdeas() {
  const ideas = document.getElementById("idea-output").innerText;
  if (!ideas.trim()) {
    showToast("Generate ideas first", true);
    return;
  }
  if (!navigator.clipboard?.writeText) {
    showToast("Clipboard API unavailable", true);
    return;
  }
  navigator.clipboard
    .writeText(ideas)
    .then(() => showToast("Campaign ideas copied"))
    .catch(() => showToast("Unable to copy", true));
}

function handleCopyShowcase(event) {
  const button = event.target.closest(".copy-showcase");
  if (!button) return;
  const business = state.businesses.find((b) => b.id === button.dataset.id);
  if (!business) return;
  const shareUrl = business.website || `https://visibilityboost.app/showcase/${business.id}`;
  if (!navigator.clipboard?.writeText) {
    showToast("Clipboard API unavailable", true);
    return;
  }
  navigator.clipboard
    .writeText(shareUrl)
    .then(() => showToast(`Link copied for ${business.name}`))
    .catch(() => showToast("Unable to copy link", true));
}

function showToast(message, isError = false) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.position = "fixed";
    toast.style.bottom = "2rem";
    toast.style.right = "2rem";
    toast.style.padding = "0.85rem 1.2rem";
    toast.style.borderRadius = "0.75rem";
    toast.style.background = isError ? "rgba(248, 113, 113, 0.9)" : "rgba(99, 102, 241, 0.9)";
    toast.style.color = "white";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "999";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.background = isError ? "rgba(248, 113, 113, 0.9)" : "rgba(99, 102, 241, 0.9)";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s ease";
    toast.style.opacity = "0";
  }, 2500);
}

function initSyncButton() {
  const button = document.getElementById("sync-google");
  button.addEventListener("click", () => {
    showToast("Sync scheduled. We'll email you once Google data is refreshed.");
  });
}

function init() {
  renderEverything();
  document.getElementById("business-form").addEventListener("submit", handleBusinessFormSubmit);
  document.getElementById("business-list").addEventListener("click", handleBusinessSelect);
  document.getElementById("keyword-table").addEventListener("click", handleKeywordToggle);
  document.getElementById("branding-form").addEventListener("submit", handleBrandingGenerate);
  document.getElementById("copy-schema").addEventListener("click", handleCopySchema);
  document.getElementById("copy-ideas").addEventListener("click", handleCopyIdeas);
  document.getElementById("showcase-list").addEventListener("click", handleCopyShowcase);
  initSyncButton();

  const chartInterval = setInterval(() => {
    if (window.Chart) {
      buildTrafficChart();
      buildConversionChart();
      clearInterval(chartInterval);
    }
  }, 150);
}

document.addEventListener("DOMContentLoaded", init);
