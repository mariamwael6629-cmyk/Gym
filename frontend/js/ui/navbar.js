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
