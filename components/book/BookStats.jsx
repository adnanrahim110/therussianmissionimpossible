import { StatsBar } from "@/components/home/StatsBar";

// Right now we are simply reusing the StatsBar exactly.
// We create this file to respect the architectural boundary if book stats diverge in Phase 8.
export function BookStats() {
  return <StatsBar />;
}
