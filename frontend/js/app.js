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
  renderOpenNow();
});

// ---------- "Open now" sign (the club never closes, so this is always true) ----------
const openNow = document.getElementById('openNow');
function renderOpenNow() {
  if (!openNow) return;
  const locale = isAr ? 'ar-EG' : 'en-US';
  const time = new Date().toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
  openNow.textContent = isAr ? `الساعة ${time} — مفتوح الآن` : `It's ${time} — we're open`;
  openNow.hidden = false;
}
renderOpenNow();
setInterval(renderOpenNow, 30000);

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

const nav = document.querySelector('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// ---------- Section entrances (skipped for reduced motion) ----------
const revealObserver = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  : null;

function armReveal(root = document) {
  if (!revealObserver) return;
  const groups = root.querySelectorAll('.section-heading, .section-sub, .about-img, .about-pillars, .service-card, .testimonial-card, .facility-item, .info-row, .map-container, .contact-form');
  groups.forEach((el) => {
    if (el.classList.contains('rv') || el.getBoundingClientRect().top < innerHeight) return;
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains(el.classList[0]));
    el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 4) * 80}ms`);
    el.classList.add('rv');
    revealObserver.observe(el);
  });
}
armReveal();

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

    setText('footerBrandDescEn', `${info.name_en}. ${info.tagline_en}. Certified coaches and a clean, quiet floor.`);
    setText('footerBrandDescAr', `${info.name_ar}. ${info.tagline_ar}. مدربون معتمدون ومكان نظيف وهادئ.`);

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
      <article class="service-card">
        <div class="service-card-bg" style="background-image: url('${s.image_url}')"></div>
        <div class="service-card-content">
          <div class="service-num" data-en>Zone ${idx + 1}</div>
          <div class="service-num" data-ar>المنطقة ${(idx + 1).toLocaleString('ar-EG')}</div>
          <h3 class="service-title" data-en>${s.title_en}</h3>
          <h3 class="service-title" data-ar>${s.title_ar}</h3>
          <p class="service-desc" data-en>${s.description_en}</p>
          <p class="service-desc" data-ar>${s.description_ar}</p>
        </div>
      </article>
    `).join('');
    armReveal(grid);
  } catch (err) {
    console.warn('Falling back to static services — backend unavailable:', err);
  }
}

// ---------- Testimonials ----------
const STAR = '<svg class="ic" aria-hidden="true"><use href="#i-star"/></svg>';
const STAR_OFF = '<svg class="ic off" aria-hidden="true"><use href="#i-star"/></svg>';

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
      <figure class="testimonial-card">
        <div class="stars" role="img" aria-label="${t.rating} / 5">${STAR.repeat(t.rating)}${STAR_OFF.repeat(5 - t.rating)}</div>
        <blockquote>
          <p class="testimonial-text" data-en>${t.text_en}</p>
          <p class="testimonial-text" data-ar>${t.text_ar || t.text_en}</p>
        </blockquote>
        <figcaption class="reviewer">
          <div class="reviewer-avatar">${initials(t.reviewer_name)}</div>
          <div>
            <div class="reviewer-name">${t.reviewer_name}</div>
            <div class="reviewer-label" data-en>Verified Member</div>
            <div class="reviewer-label" data-ar>عضو موثوق</div>
          </div>
        </figcaption>
      </figure>
    `).join('');
    armReveal(grid);
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

    // The visible button for the current language (EN and AR buttons both exist)
    const submitBtn = form.querySelector(isAr ? 'button[type="submit"][data-ar]' : 'button[type="submit"][data-en]');
    const submitLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = isAr ? 'جارٍ الإرسال…' : 'Sending...';

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
      submitBtn.innerHTML = submitLabel;
    }
  });
}

// ---------- Init ----------
loadGymInfo();
loadServices();
loadTestimonials();
initContactForm();
