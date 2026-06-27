import type { ReactNode } from "react";
import EvidenceChrome, {
  mediaChromeToVariant,
  type EvidenceChromeSize,
  type EvidenceMediaChrome,
} from "@/components/case-study/EvidenceChrome";

export type PreviewChromeFrameProps = {
  chrome: Exclude<EvidenceMediaChrome, "figjam">;
  size?: EvidenceChromeSize;
  children: ReactNode;
};

/** Figma shader asset wrapper for listing-card preview thumbnails. */
export default function PreviewChromeFrame({
  chrome,
  size = "card",
  children,
}: PreviewChromeFrameProps) {
  return (
    <EvidenceChrome variant={mediaChromeToVariant(chrome)} size={size}>
      {children}
    </EvidenceChrome>
  );
}
