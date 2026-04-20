import Image from "next/image";

type Props = {
  src: string;
  caption?: string;
  alt: string;
};

export default function CaseStudyImage({ src, caption, alt }: Props) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={2400}
          height={1350}
          sizes="(max-width: 900px) 92vw, 1240px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {caption ? (
        <figcaption style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.6, marginTop: 10 }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

