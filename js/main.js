/* ==========================================================================
   RE:GEN — main.js (shared behaviors: nav, mobile menu, footer, helpers)
   ========================================================================== */

/* --------------------------------------------------------------------------
   NAVBAR (shared)
   -------------------------------------------------------------------------- */
function initNavbar(activePage) {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mark active link
  const links = navbar.querySelectorAll("[data-nav]");
  links.forEach(l => l.classList.remove("active"));
  if (activePage) {
    const el = navbar.querySelector(`[data-nav="${activePage}"]`);
    if (el) el.classList.add("active");
  }

  // Mobile menu
  const toggle = navbar.querySelector(".nav-toggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      document.body.classList.toggle("no-scroll", open);
    });
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.classList.remove("no-scroll");
      });
    });
  }
}

/* --------------------------------------------------------------------------
   NAVBAR TEMPLATE
   -------------------------------------------------------------------------- */
const NAV_LINKS = [
  { key: "home", label: "Beranda", href: "index.html" },
  { key: "how", label: "Cara Kerja", href: "index.html#how" },
  { key: "explore", label: "Jelajah", href: "explore.html" },
  { key: "challenges", label: "Tantangan", href: "challenges.html" },
  { key: "impact", label: "Dampak", href: "impact.html" },
];

function brandMark() {
  return `
  <img src="assets/images/Regen.png" class="brand-img" alt="Logo RE:GEN" width="42" height="42">
  <span class="brand-word">RE<em>:</em>GEN</span>`;
}

function renderNavbar(containerId, activePage) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
  <header class="navbar" id="navbar">
    <div class="container navbar-inner">
      <a href="index.html" class="brand" aria-label="Beranda RE:GEN">${brandMark()}</a>
      <nav class="nav-links" aria-label="Navigasi utama">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link" data-nav="${l.key}">${l.label}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <a href="login.html" class="btn btn-ghost btn-sm btn-link" ${sessions.isLoggedIn() ? 'style="display:none"' : ""}>
          <i class="fa-solid fa-arrow-right-to-bracket"></i> Masuk
        </a>
        <a href="${sessions.isLoggedIn() ? "dashboard.html" : "register.html"}" class="btn btn-primary btn-sm" id="navCta" data-nav-cta>
          <i class="fa-solid fa-leaf"></i> ${sessions.isLoggedIn() ? "Dashboard" : "Mulai Regenerasi"}
        </a>
        <button class="nav-toggle" aria-label="Buka menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <nav class="mobile-menu-links">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="mobile-menu-link">${l.label}</a>`).join("")}
      </nav>
      <div class="mobile-menu-cta">
        <a href="${sessions.isLoggedIn() ? "dashboard.html" : "register.html"}" class="btn btn-lime btn-block">
          <i class="fa-solid fa-leaf"></i> ${sessions.isLoggedIn() ? "Ke Dashboard" : "Mulai Regenerasi"}
        </a>
        ${sessions.isLoggedIn() ? "" : `<a href="login.html" class="btn btn-outline btn-block">Masuk</a>`}
        ${sessions.isLoggedIn() ? `<a href="#" class="btn btn-outline btn-block" id="mobileLogout">Keluar</a>` : ""}
      </div>
    </div>
  </header>`;

  initNavbar(activePage);
  const logout = document.getElementById("mobileLogout");
  if (logout) logout.addEventListener("click", e => { e.preventDefault(); doLogout(); });
}

/* --------------------------------------------------------------------------
   FOOTER (shared)
   -------------------------------------------------------------------------- */
function renderFooter(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">${brandMark()}</a>
          <p class="footer-tagline">Daur Ulang Sampah. Ciptakan Masa Depan.</p>
          <p>Menghubungkan langkah kecil sehari-hari dengan dampak lingkungan yang nyata — sampah menjadi poin, kebiasaan, dan masa depan yang lebih baik.</p>
        </div>
        <div class="footer-col">
          <h5>Navigasi</h5>
          <ul>
            <li><a href="index.html">Beranda</a></li>
            <li><a href="explore.html">Jelajah Sampah</a></li>
            <li><a href="challenges.html">Tantangan</a></li>
            <li><a href="impact.html">Dampak</a></li>
            <li><a href="index.html#how">Cara Kerja</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Fitur</h5>
          <ul>
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="rewards.html">Reward</a></li>
            <li><a href="profile.html">Profil</a></li>
            <li><a href="login.html">Masuk</a></li>
            <li><a href="register.html">Gabung</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Terhubung</h5>
          <div class="footer-social">
            <a href="#" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-btn" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#" class="social-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          </div>
          <p style="margin-top:18px;font-size:0.9rem">Ikuti perjalanan kami menuju Bumi yang lebih bersih.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 RE:GEN. Dirancang demi masa depan yang lebih baik.</span>
        <a href="#" data-to-top>Kembali ke atas <i class="fa-solid fa-arrow-up"></i></a>
      </div>
    </div>
  </footer>`;

  const top = el.querySelector("[data-to-top]");
  if (top) top.addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  initToTop();
}

/* --------------------------------------------------------------------------
   BACK-TO-TOP BUTTON
   -------------------------------------------------------------------------- */
function initToTop() {
  // create if not present
  if (!document.querySelector(".to-top")) {
    const b = document.createElement("button");
    b.className = "to-top";
    b.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    b.setAttribute("aria-label", "Kembali ke atas");
    b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(b);
  }
  const btn = document.querySelector(".to-top");
  const onScroll = () => {
    btn.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   TOASTS
   -------------------------------------------------------------------------- */
function showToast(message, type = "success", icon = null) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const icons = { success: "fa-circle-check", info: "fa-circle-info", error: "fa-circle-xmark" };
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icon || icons[type] || "fa-circle-check"}"></i><span>${message}</span>`;
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 500);
  }, 3200);
}

/* --------------------------------------------------------------------------
   MODAL
   -------------------------------------------------------------------------- */
function openModal({ icon = "fa-check", title = "", text = "", confirmText = "Selesai", onConfirm = null }) {
  let overlay = document.getElementById("globalModal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "globalModal";
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-icon"><i class="fa-solid ${icon}"></i></div>
        <h3>${title}</h3>
        <p id="globalModalText">${text}</p>
        <button class="btn btn-primary btn-block" id="globalModalConfirm">${confirmText}</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal();
    });
  }
  overlay.querySelector(".modal-icon i").className = `fa-solid ${icon}`;
  overlay.querySelector("h3").textContent = title;
  document.getElementById("globalModalText").textContent = text;
  overlay.querySelector("#globalModalConfirm").textContent = confirmText;
  overlay.querySelector("#globalModalConfirm").onclick = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };
  overlay.querySelector(".modal-close").onclick = closeModal;
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}
function closeModal() {
  const overlay = document.getElementById("globalModal");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { overlay.style.display = ""; }, 400);
  }
}
window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* --------------------------------------------------------------------------
   COUNTER ANIMATION (numbers)
   -------------------------------------------------------------------------- */
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const from = 0;
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = from + (target - from) * eased;
    el.textContent = Math.floor(val).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   ACTIVITY LIST renderer (shared)
   -------------------------------------------------------------------------- */
function renderActivities(container, list) {
  const el = document.getElementById(container);
  if (!el || !list) return;
  el.innerHTML = list.map(a => `
    <div class="activity-item">
      <div class="activity-icon"><i class="fa-solid ${a.icon}"></i></div>
      <div class="activity-text">
        <div class="a-title">${a.title}</div>
        <div class="a-time">${a.time}</div>
      </div>
      <div class="activity-gain"><i class="fa-solid fa-plus"></i> ${a.gp} GP</div>
    </div>`).join("");
}

/* --------------------------------------------------------------------------
   LOGIN / LOGOUT helpers
   -------------------------------------------------------------------------- */
function doLogout() {
  sessions.logout();
  showToast("Kamu sudah keluar. Sampai jumpa!", "info", "fa-right-from-bracket");
  setTimeout(() => { window.location.href = "index.html"; }, 800);
}
function requireLogin() {
  if (!sessions.isLoggedIn()) {
    showToast("Silakan masuk dulu untuk melanjutkan.", "info", "fa-circle-info");
    setTimeout(() => { window.location.href = "login.html?next=" + encodeURIComponent(window.location.pathname.split("/").pop()); }, 700);
    return false;
  }
  return true;
}

/* --------------------------------------------------------------------------
   INIT (empty guard - pages call their own init)
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // common reveal using IntersectionObserver as fallback
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    // handled in animations.js to avoid double init
  }
});
