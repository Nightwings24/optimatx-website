import { ImageResponse } from "next/og";

// Apple touch icon (home-screen). Static PNG at build; Next handles the basePath
// on the injected <link rel="apple-touch-icon">.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          backgroundImage:
            "linear-gradient(#20294b 1px, transparent 1px), linear-gradient(90deg, #20294b 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 108, fontWeight: 800 }}>
          <span style={{ color: "#E9ECF4" }}>O</span>
          <span style={{ color: "#00884b" }}>X</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
