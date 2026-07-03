"""Seed the database with dummy (non-identifying) gym data.

Run with: python seed.py
"""
from app.database import Base, SessionLocal, engine
from app import models

Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    if not db.query(models.GymInfo).first():
        db.add(
            models.GymInfo(
                name_en="Apex Fitness Center",
                name_ar="نادي أبكس للياقة البدنية",
                tagline_en="Your Premier Fitness Destination",
                tagline_ar="وجهتك الأولى للياقة البدنية",
                phone="+1 (555) 010-2024",
                email="info@apexfitness.example.com",
                address_en="456 Wellness Avenue, Springfield, ST 62704, USA",
                address_ar="456 شارع العافية، سبرينغفيلد، الولايات المتحدة",
                working_hours_en="Open 24 Hours — Every Day",
                working_hours_ar="مفتوح ٢٤ ساعة — كل يوم",
                facebook_url="#",
                instagram_url="#",
                whatsapp_url="#",
                tiktok_url="#",
            )
        )

    if not db.query(models.Service).first():
        db.add_all(
            [
                models.Service(
                    order=1,
                    title_en="APEX GYM",
                    title_ar="جيم أبكس",
                    description_en="State-of-the-art bodybuilding and cardio equipment. Every machine you need to reach your peak physique.",
                    description_ar="أحدث معدات بناء الجسم والكارديو. كل جهاز تحتاجه للوصول إلى قمة لياقتك البدنية.",
                    image_url="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
                ),
                models.Service(
                    order=2,
                    title_en="APEX CAFÉ",
                    title_ar="كافيه أبكس",
                    description_en="Fuel your performance with nutritious post-workout meals and healthy supplements at our in-house café.",
                    description_ar="زوّد أداءك بوجبات ما بعد التمرين المغذية والمكملات الصحية في كافيتيريا الجيم.",
                    image_url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
                ),
                models.Service(
                    order=3,
                    title_en="KIDS AREA",
                    title_ar="منطقة الأطفال",
                    description_en="A safe, fun zone for your children — so you can train without worry while the little ones play.",
                    description_ar="منطقة آمنة وممتعة لأطفالك — حتى تتمكن من التدريب دون قلق بينما يلعب الصغار.",
                    image_url="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=80",
                ),
            ]
        )

    if not db.query(models.Testimonial).first():
        db.add_all(
            [
                models.Testimonial(
                    reviewer_name="Jordan Lee",
                    text_en="An amazing place... it adds beautiful feelings and gives you psychological comfort and calm.",
                    text_ar="مكان رائع... يضيف مشاعر جميلة ويمنحك الراحة النفسية والهدوء.",
                    rating=5,
                    is_approved=True,
                ),
                models.Testimonial(
                    reviewer_name="Sam Rivera",
                    text_en="A sports club, cafeteria, and kids area. A beautiful place — everything you need in one spot.",
                    text_ar="نادٍ رياضي وكافيتيريا ومنطقة أطفال. مكان جميل — كل ما تحتاجه في مكان واحد.",
                    rating=5,
                    is_approved=True,
                ),
                models.Testimonial(
                    reviewer_name="Taylor Morgan",
                    text_en="Excellent and clean. The coaches are all tasteful and professional — the best in the area.",
                    text_ar="ممتاز ونظيف. المدربون كلهم ذوو ذوق واحترافية — الأفضل في المنطقة.",
                    rating=5,
                    is_approved=True,
                ),
            ]
        )

    db.commit()
    print("Database seeded with dummy gym data.")
finally:
    db.close()
