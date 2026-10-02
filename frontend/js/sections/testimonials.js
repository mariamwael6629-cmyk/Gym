// ---------- Testimonials ----------
function initials(name) {
  return (name || '').split(' ').map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

async function loadTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/testimonials`);
    if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);
    const testimonials = await res.json();
    if (!Array.isArray(testimonials) || testimonials.length === 0) return;

    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <div class="quote-mark">"</div>
        <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
        <p class="testimonial-text" data-en>${t.text_en}</p>
        <p class="testimonial-text" data-ar>${t.text_ar || t.text_en}</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${initials(t.reviewer_name)}</div>
          <div>
            <div class="reviewer-name">${t.reviewer_name}</div>
            <div class="reviewer-label" data-en>Verified Member</div>
            <div class="reviewer-label" data-ar>عضو موثوق</div>
          </div>
        </div>
      </div>
    `).join('');
    observeRevealTargets();
  } catch (err) {
    console.warn('Falling back to static testimonials — backend unavailable:', err);
  }
}
