"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export type EvidenceReviewOverlayProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  context?: string;
  children: React.ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

export default function EvidenceReviewOverlay({
  open,
  onClose,
  title,
  description,
  context,
  children,
  returnFocusRef,
}: EvidenceReviewOverlayProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      returnFocusRef?.current?.focus();
    });
  }, [onClose, returnFocusRef]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={backdropRef}
      role="presentation"
      onClick={(event) => {
        if (event.target === backdropRef.current) {
          handleClose();
        }
      }}
      className="evidence-review-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "color-mix(in srgb, var(--jop-color-grey-120) 92%, transparent)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "min(92vw, 1600px)",
          maxHeight: "100%",
          background: "color-mix(in srgb, var(--jop-color-grey-120) 96%, transparent)",
          borderRadius: 8,
          padding: "20px 24px 24px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 16,
          }}
        >
          <div style={{ minWidth: 0 }}>
            {context ? (
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                }}
              >
                {context}
              </p>
            ) : null}
            <h2
              id={titleId}
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                lineHeight: 1.4,
                color: "var(--jop-color-sage-5)",
              }}
            >
              {title}
            </h2>
            {description ? (
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "color-mix(in srgb, var(--jop-color-sage-5) 78%, transparent)",
                }}
              >
                {description}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            style={{
              flexShrink: 0,
              margin: 0,
              padding: "4px 0",
              border: "none",
              background: "none",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--jop-color-sage-5)",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Close
          </button>
        </header>

        <div
          style={{
            height: 1,
            backgroundColor: "color-mix(in srgb, var(--jop-color-sage-5) 24%, transparent)",
            marginBottom: 20,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>

      <p className="evidence-review-esc-hint">ESC to close</p>
    </div>,
    document.body,
  );
}
