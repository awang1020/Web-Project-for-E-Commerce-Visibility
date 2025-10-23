const loadPartials = async () => {
  const includeElements = document.querySelectorAll("[data-include]");
  const loaders = Array.from(includeElements).map(async (element) => {
    const src = element.getAttribute("data-include");
    if (!src) return;

    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to load partial: ${src}`);
      }
      const markup = await response.text();
      element.innerHTML = markup;
    } catch (error) {
      console.error(error);
      element.innerHTML =
        '<p class="include-error" role="alert">We\'re sorry—this section could not be loaded.</p>';
    }
  });

  await Promise.all(loaders);
};

const initInteractions = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const navLinks = document.querySelectorAll("#primary-navigation a");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      primaryNav.classList.toggle("open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("open");
      });
    });
  }

  const categoryButtons = document.querySelectorAll(".menu-categories .chip");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formStatus = contactForm.querySelector(".form-status");
      const formData = new FormData(contactForm);
      const name = formData.get("name");

      if (formStatus) {
        formStatus.textContent = `Thank you${name ? `, ${name}` : ""}! We will confirm your request shortly.`;
      }

      contactForm.reset();
    });
  }

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = newsletterForm.querySelector("input[type='email']");
      if (!input) return;
      input.value = "";
      input.placeholder = "Thanks! Check your inbox.";
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const heroGallery = document.querySelector(".hero-gallery");
  if (heroGallery) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const items = Array.from(heroGallery.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      heroGallery.appendChild(clone);
    });

    const scrollStep = 0.35;
    let animationFrameId = null;
    let isPaused = false;

    const resetIfNeeded = () => {
      const maxScroll = heroGallery.scrollWidth / 2;
      if (heroGallery.scrollLeft >= maxScroll) {
        heroGallery.scrollLeft = 0;
      }
    };

    const step = () => {
      if (!isPaused) {
        heroGallery.scrollLeft += scrollStep;
        resetIfNeeded();
      }
      animationFrameId = requestAnimationFrame(step);
    };

    const stop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const pause = () => {
      isPaused = true;
    };

    const resume = () => {
      if (!prefersReducedMotion.matches) {
        isPaused = false;
        if (!animationFrameId) {
          step();
        }
      }
    };

    heroGallery.addEventListener("pointerenter", pause);
    heroGallery.addEventListener("pointerleave", resume);
    heroGallery.addEventListener("focusin", pause);
    heroGallery.addEventListener("focusout", resume);
    heroGallery.addEventListener("touchstart", pause, { passive: true });
    heroGallery.addEventListener("touchend", resume);
    heroGallery.addEventListener("touchcancel", resume);

    if (!prefersReducedMotion.matches) {
      step();
    } else {
      isPaused = true;
    }

    prefersReducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        isPaused = true;
        stop();
      } else {
        isPaused = false;
        if (!animationFrameId) {
          step();
        }
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();
  initInteractions();
});
