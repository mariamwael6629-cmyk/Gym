# Product

<!-- impeccable:product-schema 1 -->

> Inferred from the README, `backend/seed.py` and `frontend/index.html`. The owner chose to have the redesign proceed on inferred context; each item below is an assumption until confirmed.

## Platform

web

## Users
Local adults deciding whether to join a neighbourhood gym, many of them parents. They arrive on a phone, often from a map listing or social link, read in English or Arabic, and want three answers fast: is it clean and respectful, what is inside, how do I reach them.

## Product Purpose
A bilingual (English / Arabic, full RTL) single-page site for one gym, "Apex Fitness Center". It shows the gym's info, its three spaces (gym floor, café, kids area), approved member reviews, location, and a contact form that stores enquiries for the admin. Success is a visitor sending the form or tapping the phone number.

## Positioning
Not a hardcore bodybuilding hall: a calm, clean, respectful place that also has a café and a supervised kids area, open 24 hours. Families can train here.

## Operating Context
Content (name, tagline, phone, address, hours, socials, services, testimonials) comes from the FastAPI backend; the static HTML is the fallback when the API is down. Admin approves testimonials via JWT-protected endpoints.

## Capabilities and Constraints
- Vanilla HTML/CSS/JS, no build step, no new libraries.
- Language toggle swaps `[data-en]` / `[data-ar]` nodes and sets `dir`.
- All element IDs used by `js/app.js` must survive (`navLogoFirst`, `heroBadgeEn`, `servicesGrid`, `testimonialsGrid`, `contactForm`, the social link IDs, etc.).
- Contact form posts name, email, optional phone, message to `/api/contact`.

## Brand Commitments
- Name "Apex Fitness Center" / "نادي أبكس للياقة البدنية" and the "AF" monogram.
- Copy and SEO title stay as written unless the owner approves changes.

## Evidence on Hand
- Three seeded testimonials (Jordan Lee, Sam Rivera, Taylor Morgan), all 5 stars, marked as demo data in the seed.
- Address and phone are placeholder demo values (555 number, Springfield).
- Photos are Unsplash URLs; there is no real photography of the gym. Do not invent member counts, awards, or prices.

## Product Principles
1. Calm before hype: the differentiator is atmosphere and respect, not intensity.
2. Both languages are first-class; Arabic is never a mirrored afterthought.
3. The phone number and the form are always one tap away.

## Accessibility & Inclusion
Bilingual RTL/LTR parity; readable on small phones outdoors.
