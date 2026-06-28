import * as React from "react";
import CaseHero, { type CaseHeroImpactGroup, type CaseHeroMetric } from "@/components/case-study/CaseHero";
import type { EvidenceChromeSize, EvidenceMediaChrome } from "@/components/case-study/EvidenceChrome";
import MetadataBrief, { type MetadataBriefProps } from "@/components/case-study/MetadataBrief";

export type FlagshipOpenerProps = {
  microLabel: string;
  title: string;
  subtitle: string;
  thesisLead?: string;
  thesis: string;
  abstract: string;
  impact: CaseHeroMetric[];
  impactGroups?: CaseHeroImpactGroup[];
  showHeroImage?: boolean;
  heroImage: {
    src?: string;
    alt?: string;
    embedChrome?: EvidenceMediaChrome;
    chromeSize?: EvidenceChromeSize;
    restartGifOnVisible?: boolean;
  };
  executiveBrief: MetadataBriefProps;
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
  impactGroups,
  showHeroImage,
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
        impactGroups={impactGroups}
        showHeroImage={showHeroImage}
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
