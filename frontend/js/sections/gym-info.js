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
