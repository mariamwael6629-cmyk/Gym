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
                tagline_en="Gym, café and kids area, open 24 hours",
                tagline_ar="جيم وكافيه ومنطقة أطفال، مفتوح ٢٤ ساعة",
                phone="+1 (555) 010-2024",
                email="info@apexfitness.example.com",
                address_en="456 Wellness Avenue, Springfield, ST 62704, USA",
                address_ar="456 شارع العافية، سبرينغفيلد، الولايات المتحدة",
                working_hours_en="Open 24 hours, every day",
                working_hours_ar="مفتوح ٢٤ ساعة، كل يوم",
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
                    description_en="Up-to-date bodybuilding and cardio equipment, with every machine a full programme needs.",
                    description_ar="أجهزة حديثة لبناء الأجسام والكارديو، فيها كل ما يحتاجه برنامج تمرين كامل.",
                    image_url="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
                ),
                models.Service(
                    order=2,
                    title_en="APEX CAFÉ",
                    title_ar="كافيه أبكس",
                    description_en="Healthy meals and supplements for after your workout, without leaving the building.",
                    description_ar="وجبات صحية ومكملات لما بعد التمرين، دون أن تغادر المبنى.",
                    image_url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
                ),
                models.Service(
                    order=3,
                    title_en="KIDS AREA",
                    title_ar="منطقة الأطفال",
                    description_en="A safe play area for your children, so you can train without worrying about them.",
                    description_ar="منطقة لعب آمنة لأطفالك، فتتمرّن وأنت مطمئن عليهم.",
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
