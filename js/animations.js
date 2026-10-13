
//  RE:GEN — animations.js (GSAP + IntersectionObserver reveal, scroll fx

(function () {
  "use strict";

  let gsapLoaded = false;
  if (window.gsap) gsapLoaded = true;
  //  REVEAL SYSTEM (IntersectionObserver, AOS-like — works regardless of GSAP)
  function initReveals() {
    const els = document.querySelectorAll(".reveal, .stagger > *");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // trigger inner elements staggered
          if (entry.target.classList.contains("stagger")) {
            entry.target.querySelectorAll(":scope > *").forEach((child, i) => {
              child.style.transitionDelay = (i * 90) + "ms";
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => observer.observe(e));
  }

  /* ------------------------------------------------------------------------
     STAGGER helper: put .reveal on container, targets inside animate
     ------------------------------------------------------------------------ */
  function initStaggerChildren() {
    document.querySelectorAll(".stagger").forEach(container => {
      Array.from(container.children).forEach((child, i) => {
        child.style.setProperty("--i", i);
        child.classList.add("reveal");
      });
    });
  }

  /* ------------------------------------------------------------------------
     COUNT-UP for [data-count] elements
     ------------------------------------------------------------------------ */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const target = parseFloat(en.target.getAttribute("data-count"));
          const dec = parseInt(en.target.getAttribute("data-dec") || "0", 10);
          const oneshot = en.target.getAttribute("data-oneshot") !== "false";
          animateValue(en.target, 0, target, dec, oneshot);
          if (oneshot) obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(e => obs.observe(e));
  }

  function animateValue(el, from, to, dec, oneshot) {
    const duration = 1700;
    const start = performance.now();
    const fmt = (v) => v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * eased;
      el.textContent = fmt(val);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(to);
    }
    requestAnimationFrame(tick);
  }
  //  GSAP-BASED HERO ENTRANCE (if available)
  function initHeroEntrance() {
    if (!gsapLoaded) return;
    const grid = document.querySelector(".hero-grid");
    if (!grid) return;
    const text = grid.querySelector(".hero-text");
    const visual = grid.querySelector(".hero-visual");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(text.children, { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.1)
      .from(visual, { y: 60, opacity: 0, scale: 0.96, duration: 1.1 }, 0.3)
      .from(".float-card", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(1.7)", stagger: 0.12 }, 0.7);
  }

  /* ------------------------------------------------------------------------
     SCROLL-DRIVEN 'how it works' step progress
     ------------------------------------------------------------------------ */
  function initHowProgress() {
    const steps = document.querySelectorAll(".how-step");
    if (!steps.length || !("IntersectionObserver" in window)) {
      steps.forEach(s => s.classList.add("animated"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const idx = Array.from(steps).indexOf(en.target);
          // reveal current + all previous
          for (let i = 0; i <= idx; i++) steps[i].classList.add("animated");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    steps.forEach(s => obs.observe(s));
  }

  /* ------------------------------------------------------------------------
     PROGRESS BAR / RING animation on reveal [data-progress]
     ------------------------------------------------------------------------ */
  function initProgress() {
    // horizontal bars
    const bars = document.querySelectorAll(".progress-fill[data-progress]");
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.width = en.target.getAttribute("data-progress") + "%";
          barObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barObs.observe(b));

    // rings
    const rings = document.querySelectorAll(".ring-value[data-progress]");
    const ringObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          setTimeout(() => {
            en.target.style.strokeDashoffset = 289 - (289 * en.target.getAttribute("data-progress") / 100);
          }, 200);
          ringObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    rings.forEach(r => ringObs.observe(r));
  }

  /* ------------------------------------------------------------------------
     PARALLAX (lightweight, using scroll)
     ------------------------------------------------------------------------ */
  function initParallax() {
    const els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          els.forEach(el => {
            const speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const offset = (rect.top - window.innerHeight * 0.5) * speed;
              el.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     FLOATING CARD gentle bob
     ------------------------------------------------------------------------ */
  function initFloatBob() {
    if (!gsapLoaded) return;
    const cards = document.querySelectorAll(".float-card");
    cards.forEach((c, i) => {
      gsap.to(c, {
        y: i % 2 === 0 ? -12 : 12,
        duration: 3 + i * 0.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
  }

  /* ------------------------------------------------------------------------
     RUN
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initStaggerChildren();
    initReveals();
    initCounters();
    initProgress();
    initHeroEntrance();
    initHowProgress();
    initParallax();
    initFloatBob();
  });

})();
