import { ImageResponse } from "next/og";

// Favicon, generated at build as a static PNG. Next injects the <link> with the
// correct basePath, so no sub-path juggling is needed here.
export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0D14",
          color: "#17a862",
          fontSize: 46,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        X
      </div>
    ),
    { ...size }
  );
}
