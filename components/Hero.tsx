"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

function parseCssColorToRgb(inputRaw: string): [number, number, number] | null {
  const input = inputRaw.trim().toLowerCase();
  if (!input) return null;

  // hex: #rgb / #rrggbb
  if (input.startsWith("#")) {
    const hex = input.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      if ([r, g, b].some((v) => Number.isNaN(v))) return null;
      return [r, g, b];
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if ([r, g, b].some((v) => Number.isNaN(v))) return null;
      return [r, g, b];
    }
    return null;
  }

  // rgb/rgba: rgb(0, 0, 0) or rgba(0,0,0,0.5)
  const rgbMatch = input.match(
    /^rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)(?:\s*,\s*([0-9.]+))?\s*\)$/
  );
  if (rgbMatch) {
    const r = Number(rgbMatch[1]);
    const g = Number(rgbMatch[2]);
    const b = Number(rgbMatch[3]);
    if ([r, g, b].some((v) => !Number.isFinite(v))) return null;
    return [Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, g)), Math.max(0, Math.min(255, b))];
  }

  return null;
}

function GridCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const lastDrawTs = useRef<number>(0);
  const activeUntilTs = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const rgbRef = useRef<[number, number, number]>([0, 0, 0]);
  const reduceMotionRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 26;
    const ROWS = 20;
    const FL = 520;
    const IDLE_FPS_INTERVAL_MS = 1000 / 30;
    const ACTIVE_BOOST_WINDOW_MS = 2000;

    const readBrandColor = () => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      const fg = styles.getPropertyValue("--fg").trim();
      const fgMuted = styles.getPropertyValue("--fg-muted").trim();
      const parsed =
        parseCssColorToRgb(fgMuted) ?? parseCssColorToRgb(fg) ?? parseCssColorToRgb("rgb(0,0,0)");
      if (parsed) rgbRef.current = parsed;
    };

    const readReduceMotion = () => {
      reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    };

    const resize = () => {
      readBrandColor();
      readReduceMotion();

      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;

      const now = performance.now();
      const isActive = now < activeUntilTs.current;
      const desiredDpr = reduceMotionRef.current ? 1 : isActive ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      dprRef.current = desiredDpr;

      canvas.width = Math.floor(cssW * desiredDpr);
      canvas.height = Math.floor(cssH * desiredDpr);

      // Draw in CSS pixel space; backing store uses DPR.
      ctx.setTransform(desiredDpr, 0, 0, desiredDpr, 0, 0);

      // If reduced motion, render a single still frame immediately (and on resize).
      if (reduceMotionRef.current) {
        drawFrame(performance.now());
      }
    };

    const bumpActive = () => {
      const prevActive = performance.now() < activeUntilTs.current;
      activeUntilTs.current = performance.now() + ACTIVE_BOOST_WINDOW_MS;

      // If we were idle, switching to active may increase DPR. Resize to apply.
      if (!prevActive) resize();

      // If we were paused (no RAF scheduled), restart.
      if (!document.hidden && raf.current == null && !reduceMotionRef.current) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    const drawFrame = (ts: number) => {
      const t = ts * 0.001;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const [r, g, b] = rgbRef.current;
      const dpr = dprRef.current;

      ctx.clearRect(0, 0, W, H);

      const pts: { sx: number; sy: number; alpha: number }[][] = [];
      for (let rI = 0; rI <= ROWS; rI++) {
        pts[rI] = [];
        for (let cI = 0; cI <= COLS; cI++) {
          const nx = (cI / COLS) * 2 - 1;
          const nz = rI / ROWS;

          const x3 = nx * 900;
          const z3 = (1 - nz) * 1100 + 80;

          const wave1 = Math.sin(nx * 2.2 + nz * 1.8 - t * 0.55) * 38;
          const wave2 = Math.sin(nx * 4.1 - nz * 2.6 + t * 0.38) * 16;
          const y3 = wave1 + wave2 - 60;

          const scale = FL / (FL + z3);
          const sx = W * 0.5 + x3 * scale;
          const sy = H * 0.62 + y3 * scale;

          const depthFade = nz * 0.9;
          const sideFade = Math.abs(nx) * 0.4 + 0.6;
          const alpha = depthFade * sideFade * 0.11;

          pts[rI][cI] = { sx, sy, alpha };
        }
      }

      // Keep visual line thickness stable across DPR transforms.
      ctx.lineWidth = 0.65 / Math.max(1, dpr);

      for (let rI = 0; rI <= ROWS; rI++) {
        for (let cI = 0; cI < COLS; cI++) {
          const p1 = pts[rI][cI];
          const p2 = pts[rI][cI + 1];
          const a = (p1.alpha + p2.alpha) * 0.5;
          if (a < 0.003) continue;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.stroke();
        }
      }

      for (let cI = 0; cI <= COLS; cI++) {
        for (let rI = 0; rI < ROWS; rI++) {
          const p1 = pts[rI][cI];
          const p2 = pts[rI + 1][cI];
          const a = (p1.alpha + p2.alpha) * 0.5;
          if (a < 0.003) continue;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.stroke();
        }
      }
    };

    const tick = (ts: number) => {
      raf.current = null;

      if (document.hidden || reduceMotionRef.current) return;

      const isActive = ts < activeUntilTs.current;
      if (!isActive && ts - lastDrawTs.current < IDLE_FPS_INTERVAL_MS) {
        raf.current = requestAnimationFrame(tick);
        return;
      }

      // If we crossed active/idle boundary, DPR might change.
      const desiredDpr = isActive ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      if (Math.abs(desiredDpr - dprRef.current) > 0.001) {
        resize();
      }

      lastDrawTs.current = ts;
      drawFrame(ts);
      raf.current = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (raf.current != null) cancelAnimationFrame(raf.current);
        raf.current = null;
        return;
      }
      // On return to visible, refresh sizing/tokens and resume.
      resize();
      if (!reduceMotionRef.current && raf.current == null) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointermove",
      "pointerdown",
      "wheel",
      "scroll",
      "keydown",
      "touchstart",
    ];
    for (const evt of interactionEvents) window.addEventListener(evt, bumpActive, { passive: true });

    // Start RAF unless reduced motion is enabled.
    if (!reduceMotionRef.current) raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const evt of interactionEvents) window.removeEventListener(evt, bumpActive);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GridCanvas />
      <div
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 38% 52%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.6) 55%, transparent 100%)",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p
          className="animate-fade-up delay-1"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--fg-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          PRODUCT DESIGN LEAD · DESIGN SYSTEMS · DESIGNOPS · AI UX
        </p>
        <h1
          className="animate-fade-up delay-2"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 880,
            marginBottom: 32,
          }}
        >
          I design systems that evolve — from fragmented to intelligent.
        </h1>
        <p
          className="animate-fade-up delay-3"
          style={{
            fontSize: 20,
            color: "var(--fg-muted)",
            maxWidth: 600,
            marginBottom: 48,
            lineHeight: 1.5,
          }}
        >
          Product Design Lead working across enterprise SaaS, fintech infrastructure, and AI — designing systems, DesignOps, and intelligent workflows.
        </p>
        <div className="animate-fade-up delay-4 hero-cta">
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--fg)",
              color: "var(--bg)",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            View systems →
          </Link>
          <Link
            href="/leadership"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "var(--fg)",
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid var(--border)",
              letterSpacing: "-0.01em",
            }}
          >
            Leadership & DesignOps
          </Link>
        </div>
      </div>
    </section>
  );
}
