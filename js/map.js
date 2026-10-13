/* ==========================================================================
   RE:GEN — map.js (Leaflet drop point map)
   Demo data only — illustrative locations, not real geography.
   ========================================================================== */

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  /* illustrative demo center — not a real location claim */
  const center = [dropPoints[0].lat, dropPoints[0].lng];

  const map = L.map("map", { center, zoom: 13, scrollWheelZoom: false }).setView(center, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const markers = [];

  dropPoints.forEach((dp, i) => {
    const icon = L.divIcon({
      className: "custom-marker-wrap",
      html: `<div class="custom-marker ${dp.status === "busy" ? "marker-active" : ""}"><i class="fa-solid fa-leaf"></i></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -28]
    });
    const marker = L.marker([dp.lat, dp.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div>
          <div class="n">${dp.name}</div>
          <div class="d">${dp.address} · ${dp.distance}</div>
          <div class="d" style="margin-top:4px"><span class="dp-status ${dp.status}"><span class="d"></span>${dp.status === "open" ? "Buka" : "Ramai"}</span> · ${dp.hours}</div>
          <div class="cats">${dp.cats.map(c => `<span>${CATEGORY_META[c].label}</span>`).join("")}</div>
        </div>`);
    marker.on("click", () => {
      document.querySelectorAll(".drop-point-item").forEach(el => el.classList.remove("active"));
      const item = document.querySelector(`[data-dp-id="${dp.id}"]`);
      if (item) item.classList.add("active");
    });
    markers.push(marker);
  });

  // sidebar list interactions
  document.querySelectorAll(".drop-point-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = parseInt(item.getAttribute("data-dp-id"), 10);
      document.querySelectorAll(".drop-point-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      const idx = dropPoints.findIndex(dp => dp.id === id);
      if (idx >= 0) {
        map.setView([dropPoints[idx].lat, dropPoints[idx].lng], 14);
        markers[idx].openPopup();
      }
    });
  });

  /* fit bounds to markers */
  const group = L.featureGroup(markers);
  if (markers.length) map.fitBounds(group.getBounds().pad(0.25));
  map.setView(center, 13);

  /* expose focus helper for sidebar interactions */
  window.__mapFocus = function (id) {
    const idx = dropPoints.findIndex(dp => dp.id === id);
    if (idx >= 0) {
      map.setView([dropPoints[idx].lat, dropPoints[idx].lng], 15);
      markers[idx].openPopup();
      document.querySelectorAll(".drop-point-item").forEach(el => el.classList.remove("active"));
      const item = document.querySelector(`[data-dp-id="${id}"]`);
      if (item) item.classList.add("active");
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("map")) initMap();
});
