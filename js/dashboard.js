
function drawRing(el, percent) {
  if (!el) return;
  el.innerHTML = `
    <svg class="ring-svg" viewBox="0 0 108 108" style="width:100%;height:100%" aria-hidden="true">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#22C55E"/>
          <stop offset="100%" stop-color="#A3E635"/>
        </linearGradient>
      </defs>
      <circle class="ring-track" cx="54" cy="54" r="46"/>
      <circle class="ring-value" cx="54" cy="54" r="46" data-progress="${percent}"/>
    </svg>
    <div class="ring-center">
      <div>
        <div class="rv">${percent}%</div>
        <div class="rl">ke berikutnya</div>
      </div>
    </div>`;
  // trigger animation
  const val = el.querySelector(".ring-value");
  setTimeout(() => { val.style.strokeDashoffset = 289 - (289 * percent / 100); }, 300);
}

/* simulate adding GP on dashboard */
function initSimulateGP() {
  const btn = document.getElementById("simulateGP");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const user = sessions.user() || defaultUser;
    const add = 25;
    user.points = (user.points || 0) + add;
    sessions.login(user);
    // update display
    const numEl = document.getElementById("gpBalance");
    if (numEl) { numEl.textContent = user.points; }
    const kpi = document.getElementById("kpiGP");
    if (kpi) { kpi.querySelector(".kpi-num").textContent = user.points; }
    updateProgressUI(user.points || 0);
    showToast(`+${add} GP ditambahkan! Aktivitas tercatat.`, "success", "fa-leaf");
  });
}

function updateProgressUI(points) {
  const ring = document.getElementById("gpRing");
  const target = 1000;
  const pct = Math.min(Math.round((points / target) * 100), 100);
  if (ring) drawRing(ring, pct);
  const label = document.getElementById("gpProgressLabel");
  if (label) label.innerHTML = `<strong>${points} / ${target} GP</strong>`;
  const next = document.getElementById("gpNextReward");
  if (next) next.textContent = pct >= 50 ? "Botol Minum" : "Tas Belanja Eco";
}

function initChallengeToggles() {
  document.querySelectorAll("[data-challenge]").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".challenge-item");
      const day = card && card.querySelector(".ch-day.today");
      if (day && !day.classList.contains("done")) {
        day.classList.remove("today");
        day.classList.add("done");
        showToast("Hari selesai! +GP didapat.", "success", "fa-flag-checkered");
        // add GP
        const user = sessions.user() || defaultUser;
        user.points = (user.points || 0) + 20;
        sessions.login(user);
      } else {
        showToast("Mantap! Pertahankan streak-mu.", "info", "fa-fire");
      }
      // update button state
      btn.classList.toggle("btn-joined");
      btn.classList.toggle("btn-join");
      const label = btn.querySelector("span");
      if (label) {
        const doneCount = card ? card.querySelectorAll(".ch-day.done").length : 0;
        const total = card ? card.querySelectorAll(".ch-day").length : 7;
        if (doneCount === total) {
          label.textContent = "Selesai";
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Selesai';
        } else {
          label.textContent = doneCount > 0 ? "Lanjutkan" : "Ikuti Tantangan";
          btn.innerHTML = `<i class="fa-solid fa-leaf"></i> <span>${doneCount > 0 ? "Lanjutkan" : "Ikuti Tantangan"}</span>`;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   USER POINTS COUNTER
   -------------------------------------------------------------------------- */
function getUserPoints() {
  const u = sessions.user() || defaultUser;
  return u.points || 0;
}

/* --------------------------------------------------------------------------
   RENDER DASHBOARD KPIs
   -------------------------------------------------------------------------- */
function renderDashboardKPIs() {
  const p = getUserPoints();
  const els = {
    gp: document.getElementById("kpiGP"),
    kg: document.getElementById("kpiKG"),
    streak: document.getElementById("kpiStreak"),
    items: document.getElementById("kpiItems")
  };
  if (els.gp) els.gp.querySelector(".kpi-num").textContent = p.toLocaleString();
  if (els.kg) els.kg.querySelector(".kpi-num").textContent = "24.8";
  if (els.streak) els.streak.querySelector(".kpi-num").textContent = "14";
  if (els.items) els.items.querySelector(".kpi-num").textContent = "186";
}

/* --------------------------------------------------------------------------
   INIT (dispatch based on page presence)
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderDashboardKPIs();
  if (document.getElementById("gpRing")) {
    const points = getUserPoints();
    updateProgressUI(points);
  }
  initSimulateGP();
  initChallengeToggles();
});
