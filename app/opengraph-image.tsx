import { ImageResponse } from "next/og";

// Build-time social card (1200×630). Generated as a static PNG during export.
export const dynamic = "force-static";
export const alt = "OptimatX - Mathematics Society, IIT Patna";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B0D14",
          backgroundImage:
            "linear-gradient(#20294b 1px, transparent 1px), linear-gradient(90deg, #20294b 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          color: "#E9ECF4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#4ED99A",
          }}
        >
          IIT Patna · Mathematics Society
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: -4,
          }}
        >
          Optimat
          <span style={{ color: "#00884b" }}>X</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 40,
            color: "#A5AEC2",
          }}
        >
          Conjecture, prove, repeat.
        </div>
      </div>
    ),
    { ...size }
  );
}
