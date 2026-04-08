"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CursorGlowField } from "@/components/ui/CursorGlowField";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroSlides = [
  {
    image: "/imgs/p1.jpg",
    alt: "Mission placeholder slide 01",
  },
  {
    image: "/imgs/p2.jpg",
    alt: "Mission placeholder slide 02",
  },
  {
    image: "/imgs/p3.jpg",
    alt: "Mission placeholder slide 03",
  },
];

export function MissionHeroSection() {
  return (
    <section className="section-tone-obsidian relative overflow-hidden pt-30 pb-14 md:pt-36 md:pb-20 lg:pt-44 lg:pb-24">
      <CursorGlowField
        className="opacity-85"
        size={700}
        color="rgba(203, 47, 67, 0.16)"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay-dark opacity-26"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 grain-overlay pointer-events-none opacity-72"
      />
      <div
        aria-hidden="true"
        className="absolute -left-14 top-20 h-64 w-64 rounded-full bg-accent/18 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-slate-400/14 blur-[145px]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:gap-14">
          <div>
            <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-stone-400">
              Operation Stream 3.0
            </p>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4.5vw+0.3rem,3.7rem)] leading-none text-stone-50">
              The Russian <br /> Mission Impossible
            </h1>

            <div className="mt-4 lg:mt-8 space-y-4">
              <p className="max-w-3xl text-base leading-relaxed text-stone-200 md:text-lg lg:text-xl">
                A documentary narrative of the operation that unfolded in the
                Kursk border region and the soldiers who crossed beyond human
                limits.
              </p>
            </div>

            <div className="mt-4 lg:mt-8 space-y-4">
              <p className="max-w-3xl text-base leading-relaxed text-stone-300 md:text-lg">
                The story begins with the occupation of Sudzha and the civilians
                trapped under constant shelling. As the situation escalates,
                Russian special forces undertake a daring mission, entering a
                gas pipeline and traveling through extreme conditions to reach
                enemy positions and liberate the territory.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/bio"
                size="lg"
                className="min-w-32 max-lg:px-4! max-lg:tracking-[0.2em]! lg:min-w-55"
              >
                See Images
              </Button>
              <Button
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="min-w-32 max-lg:px-4! max-lg:tracking-[0.2em]! lg:min-w-55"
              >
                Buy Book on Amazon
              </Button>
            </div>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 0, disableOnInteraction: true }}
              speed={10000}
              loop
              className="*:ease-linear!"
              spaceBetween={10}
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.image} className="w-auto!">
                  <div className="relative h-100 sm:h-120 lg:h-136 w-auto">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      height={1080}
                      width={1080}
                      className="w-auto h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
}
