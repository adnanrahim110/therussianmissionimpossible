"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TESTIMONIALS } from "@/lib/content";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  return (
    <section
      className="section-padding bg-stone-100 overflow-hidden"
      id="praise"
    >
      <Container>
        <SectionHeading
          title="Critical Acclaim"
          subtitle="Early praise for the documentary account of the pipeline siege."
          align="center"
        />

        <div className="mt-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16!" // padding for pagination bullets
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <TestimonialCard
                  quote={t.quote}
                  author={t.author}
                  role={t.role}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: var(--color-stone-400);
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: var(--color-crimson-600);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
