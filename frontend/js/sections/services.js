// ---------- Services ----------
async function loadServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services`);
    if (!res.ok) throw new Error(`Services request failed: ${res.status}`);
    const services = await res.json();
    if (!Array.isArray(services) || services.length === 0) return;

    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map((s, idx) => `
      <div class="service-card">
        <div class="service-card-bg" style="background-image: url('${s.image_url}')"></div>
        <div class="service-card-overlay"></div>
        <div class="service-card-content">
          <div class="service-num" data-en>${String(idx + 1).padStart(2, '0')} — SERVICE</div>
          <div class="service-num" data-ar>٠${idx + 1} — خدمة</div>
          <div class="service-title" data-en>${s.title_en}</div>
          <div class="service-title" data-ar>${s.title_ar}</div>
          <div class="service-desc" data-en>${s.description_en}</div>
          <div class="service-desc" data-ar>${s.description_ar}</div>
        </div>
      </div>
    `).join('');
    observeRevealTargets();
  } catch (err) {
    console.warn('Falling back to static services — backend unavailable:', err);
  }
}
