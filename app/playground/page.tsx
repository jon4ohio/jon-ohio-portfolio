import type { Metadata } from "next";
import PlaygroundClient from "@/components/PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground",
  description: "JEDI component sandbox for Portfolio V2 experiments.",
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
