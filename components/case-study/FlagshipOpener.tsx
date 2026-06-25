import * as React from "react";
import CaseHero, { type CaseHeroMetric } from "@/components/case-study/CaseHero";
import MetadataBrief, { type MetadataBriefProps } from "@/components/case-study/MetadataBrief";

export type FlagshipOpenerProps = {
  microLabel: string;
  title: string;
  subtitle: string;
  thesisLead?: string;
  thesis: string;
  abstract: string;
  impact: CaseHeroMetric[];
  heroImage: { src?: string; alt?: string };
  executiveBrief: MetadataBriefProps;
  /** When set, wraps hero + brief in one anchored section (e.g. `snapshot`). */
  sectionId?: string;
};

export default function FlagshipOpener({
  microLabel,
  title,
  subtitle,
  thesisLead,
  thesis,
  abstract,
  impact,
  heroImage,
  executiveBrief,
  sectionId,
}: FlagshipOpenerProps) {
  const content = (
    <>
      <CaseHero
        microLabel={microLabel}
        title={title}
        subtitle={subtitle}
        thesisLead={thesisLead}
        thesis={thesis}
        abstract={abstract}
        impact={impact}
        heroImage={heroImage}
      />
      <MetadataBrief {...executiveBrief} omitSectionId={Boolean(sectionId)} />
    </>
  );

  if (sectionId) {
    return <section id={sectionId}>{content}</section>;
  }

  return content;
}

