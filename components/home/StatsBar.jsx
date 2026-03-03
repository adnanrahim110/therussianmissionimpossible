import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { STATS } from "@/lib/constants";

export function StatsBar() {
  return (
    <section className="py-16 md:py-24 bg-stone-900 text-stone-50 border-y border-stone-800">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.1}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl text-crimson-500 mb-4 pb-4 border-b border-stone-800 w-full">
                <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <h4 className="font-body text-sm md:text-base font-medium text-stone-300 uppercase tracking-widest px-4">
                {stat.label}
              </h4>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
