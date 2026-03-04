import { AuthorIntro } from "@/components/home/AuthorIntro";
import { BookIntro } from "@/components/home/BookIntro";
import { CTABanner } from "@/components/home/CTABanner";
import { HomeHero } from "@/components/home/HomeHero";
import { StatsBar } from "@/components/home/StatsBar";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HomeHero />
      <BookIntro />
      <StatsBar />
      <AuthorIntro />
      <Testimonials />
      <CTABanner />
    </>
  );
}
