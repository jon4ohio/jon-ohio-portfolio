import * as React from "react";
import CaseHero, { type CaseHeroMetric } from "@/components/case-study/CaseHero";
import MetadataBrief, { type MetadataBriefProps } from "@/components/case-study/MetadataBrief";

export type FlagshipOpenerProps = {
  microLabel: string;
  title: string;
  subtitle: string;
  thesis: string;
  abstract: string;
  impact: CaseHeroMetric[];
  heroImage: { src?: string; alt?: string };
  executiveBrief: MetadataBriefProps;
};

export default function FlagshipOpener({
  microLabel,
  title,
  subtitle,
  thesis,
  abstract,
  impact,
  heroImage,
  executiveBrief,
}: FlagshipOpenerProps) {
  return (
    <>
      <CaseHero
        microLabel={microLabel}
        title={title}
        subtitle={subtitle}
        thesis={thesis}
        abstract={abstract}
        impact={impact}
        heroImage={heroImage}
      />
      <MetadataBrief {...executiveBrief} />
    </>
  );
}

