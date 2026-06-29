"use client";

import { useCallback, useRef, useState } from "react";
import EvidenceReviewOverlay from "@/components/case-study/evidence/EvidenceReviewOverlay";

export type MediaViewTriggerProps = {
  title: string;
  description?: string;
  context?: string;
  disabled?: boolean;
  ariaHidden?: boolean;
  affordanceVariant?: "default" | "chrome";
  triggerStyle?: React.CSSProperties;
  children: React.ReactNode;
  overlayChildren: React.ReactNode;
};

export default function MediaViewTrigger({
  title,
  description,
  context,
  disabled = false,
  ariaHidden = false,
  affordanceVariant = "default",
  triggerStyle,
  children,
  overlayChildren,
}: MediaViewTriggerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const openOverlay = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  const closeOverlay = useCallback(() => {
    setOpen(false);
  }, []);

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openOverlay();
    }
  };

  const affordanceClassName =
    affordanceVariant === "chrome"
      ? "evidence-image-affordance evidence-image-affordance--chrome"
      : "evidence-image-affordance";

  return (
    <>
      <div
        ref={triggerRef}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        aria-label={disabled ? undefined : `Expand image: ${title}`}
        aria-hidden={ariaHidden || undefined}
        className={disabled ? undefined : "evidence-image-trigger"}
        onClick={disabled ? undefined : openOverlay}
        onKeyDown={onTriggerKeyDown}
        style={triggerStyle}
      >
        {children}
        {disabled ? null : (
          <span className={affordanceClassName} aria-hidden="true">
            ↗ Expand
          </span>
        )}
      </div>
      <EvidenceReviewOverlay
        open={open}
        onClose={closeOverlay}
        title={title}
        description={description}
        context={context}
        returnFocusRef={triggerRef}
      >
        {overlayChildren}
      </EvidenceReviewOverlay>
    </>
  );
}
