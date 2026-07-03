const API_BASE_URL = window.API_BASE_URL;

// ---------- Language toggle ----------
const langToggle = document.getElementById('langToggle');
const body = document.body;
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let isAr = false;

langToggle.addEventListener('click', () => {
  isAr = !isAr;
  if (isAr) {
    body.classList.add('ar');
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    langToggle.textContent = 'English';
  } else {
    body.classList.remove('ar');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    langToggle.textContent = 'العربية';
  }
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Scroll reveal ----------
function observeRevealTargets() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pillar, .testimonial-card, .service-card, .facility-item, .location-info .info-row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s';
    observer.observe(el);
  });
}
observeRevealTargets();

// ---------- Helpers ----------
function splitLogoWords(name) {
  const parts = (name || '').split(' ');
  return { first: parts[0] || '', rest: parts.slice(1).join(' ') };
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null && value !== '') el.textContent = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.setAttribute('href', value);
}

// ---------- Gym info ----------
async function loadGymInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gym-info`);
    if (!res.ok) throw new Error(`Gym info request failed: ${res.status}`);
    const info = await res.json();

    document.title = `${info.name_en} | ${info.name_ar}`;

    const navLogo = splitLogoWords(info.name_en);
    setText('navLogoFirst', navLogo.first.toUpperCase());
    setText('navLogoRest', navLogo.rest.toUpperCase());
    setText('footerLogoFirst', navLogo.first.toUpperCase());
    setText('footerLogoRest', navLogo.rest.toUpperCase());

    setText('heroBadgeEn', info.tagline_en);
    setText('heroBadgeAr', info.tagline_ar);

    setText('locationHeadingEn', `VISIT ${info.name_en.toUpperCase()}`);
    setText('locationHeadingAr', `تفضّل بزيارة ${info.name_ar}`);

    setText('addressValueEn', info.address_en);
    setText('addressValueAr', info.address_ar);
    setText('mapAddressText', info.address_en);

    setText('phoneValueText', info.phone);
    setHref('phoneValueLink', `tel:${info.phone.replace(/[^+\d]/g, '')}`);
    setHref('navPhoneLink', `tel:${info.phone.replace(/[^+\d]/g, '')}`);
    setText('navPhoneText', info.phone);

    setText('hoursValueEn', info.working_hours_en);
    setText('hoursValueAr', info.working_hours_ar);

    setText('footerPhoneText', info.phone);
    setHref('footerPhoneLink', `tel:${info.phone.replace(/[^+\d]/g, '')}`);
    setText('footerHoursEn', info.working_hours_en);
    setText('footerHoursAr', info.working_hours_ar);

    setText('footerBrandDescEn', `${info.name_en} — ${info.tagline_en}. Professional coaches, elite equipment, and a welcoming atmosphere available around the clock.`);
    setText('footerBrandDescAr', `${info.name_ar} — ${info.tagline_ar}. مدربون محترفون، معدات متطورة، وأجواء ترحيبية على مدار الساعة.`);

    const year = new Date().getFullYear();
    setText('footerCopyEn', `© ${year} ${info.name_en}. All rights reserved.`);
    setText('footerCopyAr', `© ${year} ${info.name_ar}. جميع الحقوق محفوظة.`);

    ['Facebook', 'Instagram', 'Whatsapp', 'Tiktok'].forEach(key => {
      const fieldKey = `${key.toLowerCase()}_url`;
      setHref(`locSocial${key}`, info[fieldKey]);
      setHref(`footSocial${key}`, info[fieldKey]);
    });
  } catch (err) {
    console.warn('Falling back to static gym info — backend unavailable:', err);
  }
}

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

// ---------- Contact form ----------
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactFormStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill in your name, email, and message.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.detail || 'Something went wrong. Please try again.');
      }

      status.className = 'form-status success';
      status.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
      form.reset();
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = typeof err.message === 'string' ? err.message : 'Could not send your message. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// ---------- Init ----------
loadGymInfo();
loadServices();
loadTestimonials();
initContactForm();
