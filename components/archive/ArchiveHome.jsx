"use client";

import { AccessCTASection } from "./archive-home/AccessCTASection";
import { ArchiveIntroGate } from "./archive-home/ArchiveIntroGate";
import { AuthorsTeaserSection } from "./archive-home/AuthorsTeaserSection";
import { EvidenceBoardSection } from "./archive-home/EvidenceBoardSection";
import { MissionBriefingSection } from "./archive-home/MissionBriefingSection";
import { MissionMapSection } from "./archive-home/MissionMapSection";
import { MissionSection } from "./archive-home/MissionSection";
import { MythOrOperationSection } from "./archive-home/MythOrOperationSection";
import { OperationTimelineSection } from "./archive-home/OperationTimelineSection";
import { PressTeaserSection } from "./archive-home/PressTeaserSection";
import { TunnelJourneySection } from "./archive-home/TunnelJourneySection";

export function ArchiveHome() {
  return (
    <>
      <ArchiveIntroGate />
      <MissionSection />
      <OperationTimelineSection />
      <MythOrOperationSection />
      <EvidenceBoardSection />
      <TunnelJourneySection />
      <MissionBriefingSection />
      <MissionMapSection />
      <AuthorsTeaserSection />
      <PressTeaserSection />
      <AccessCTASection />
    </>
  );
}
