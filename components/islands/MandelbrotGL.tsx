"use client";

import { useEffect, useRef, useState } from "react";
import { compileProgram, fullscreenQuad } from "@/lib/webgl";
import { Slider } from "@/components/ui/Slider";

// GPU Mandelbrot deep-zoom. The escape-time loop runs per-pixel in a fragment
// shader, so zooming stays smooth in real time. Single 32-bit precision (goes
// soft past ~1e5 zoom - deeper needs double-float or perturbation, a documented
// later upgrade). Click to zoom in, scroll to zoom, presets to jump.
const SIZE = 480;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uCenter;
uniform float uScale;   // half-height of the view, in complex units
uniform float uAspect;
uniform int uMaxIter;
uniform float uOffset;
uniform vec2 uRes;

// The brand ramp (lib/artcolor) ported to GLSL: deep, green, blue, gold, rose.
vec3 palette(float t) {
  vec3 c0 = vec3(0.043, 0.051, 0.078);
  vec3 c1 = vec3(0.000, 0.533, 0.294);
  vec3 c2 = vec3(0.345, 0.651, 1.000);
  vec3 c3 = vec3(0.961, 0.753, 0.290);
  vec3 c4 = vec3(0.984, 0.443, 0.522);
  float x = clamp(t, 0.0, 1.0) * 4.0;
  if (x < 1.0) return mix(c0, c1, x);
  if (x < 2.0) return mix(c1, c2, x - 1.0);
  if (x < 3.0) return mix(c2, c3, x - 2.0);
  return mix(c3, c4, x - 3.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 c = uCenter + vec2((uv.x - 0.5) * uAspect, uv.y - 0.5) * (2.0 * uScale);
  vec2 z = vec2(0.0);
  bool escaped = false;
  float n = 0.0;
  for (int i = 0; i < 1024; i++) {
    if (i >= uMaxIter) break;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    if (dot(z, z) > 65536.0) { escaped = true; n = float(i); break; }
  }
  if (!escaped) { gl_FragColor = vec4(0.043, 0.051, 0.078, 1.0); return; }
  float nu = n + 1.0 - log2(log2(length(z)));
  gl_FragColor = vec4(palette(fract(0.06 * nu + uOffset)), 1.0);
}
`;

const presets = [
  { name: "Home", cx: -0.5, cy: 0, scale: 1.5 },
  { name: "Seahorse", cx: -0.745, cy: 0.113, scale: 0.05 },
  { name: "Elephant", cx: 0.275, cy: 0.007, scale: 0.05 },
  { name: "Spiral", cx: -0.088, cy: 0.654, scale: 0.02 },
];

export function MandelbrotGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<((cx: number, cy: number, s: number, it: number, o: number) => void) | null>(null);
  const viewRef = useRef({ cx: -0.5, cy: 0, scale: 1.5, maxIter: 300, offset: 0 });
  const [supported, setSupported] = useState(true);
  const [center, setCenter] = useState<[number, number]>([-0.5, 0]);
  const [scale, setScale] = useState(1.5);
  const [maxIter, setMaxIter] = useState(300);
  const [offset, setOffset] = useState(0);

  viewRef.current = { cx: center[0], cy: center[1], scale, maxIter, offset };

  // one-time GL setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true });
    if (!gl) {
      setSupported(false);
      return;
    }
    const program = compileProgram(gl, VERT, FRAG);
    if (!program) {
      setSupported(false);
      return;
    }
    gl.useProgram(program);
    fullscreenQuad(gl, program);
    const uCenter = gl.getUniformLocation(program, "uCenter");
    const uScale = gl.getUniformLocation(program, "uScale");
    const uAspect = gl.getUniformLocation(program, "uAspect");
    const uMaxIter = gl.getUniformLocation(program, "uMaxIter");
    const uOffset = gl.getUniformLocation(program, "uOffset");
    const uRes = gl.getUniformLocation(program, "uRes");
    gl.viewport(0, 0, canvas.width, canvas.height);
    drawRef.current = (cx, cy, s, it, o) => {
      gl.uniform2f(uCenter, cx, cy);
      gl.uniform1f(uScale, s);
      gl.uniform1f(uAspect, canvas.width / canvas.height);
      gl.uniform1i(uMaxIter, it);
      gl.uniform1f(uOffset, o);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const v = viewRef.current;
    drawRef.current(v.cx, v.cy, v.scale, v.maxIter, v.offset);
    return () => {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // redraw on any state change
  useEffect(() => {
    drawRef.current?.(center[0], center[1], scale, maxIter, offset);
  }, [center, scale, maxIter, offset]);

  // wheel zoom needs a non-passive listener to prevent the page scrolling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const { cx, cy, scale: s } = viewRef.current;
      const uvx = (e.clientX - rect.left) / rect.width;
      const uvy = 1 - (e.clientY - rect.top) / rect.height;
      const px = cx + (uvx - 0.5) * 2 * s;
      const py = cy + (uvy - 0.5) * 2 * s;
      const f = e.deltaY > 0 ? 1.18 : 1 / 1.18;
      const ns = Math.min(2, Math.max(4e-6, s * f));
      setCenter([px + (cx - px) * (ns / s), py + (cy - py) * (ns / s)]);
      setScale(ns);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, []);

  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { cx, cy, scale: s } = viewRef.current;
    const uvx = (e.clientX - rect.left) / rect.width;
    const uvy = 1 - (e.clientY - rect.top) / rect.height;
    setCenter([cx + (uvx - 0.5) * 2 * s, cy + (uvy - 0.5) * 2 * s]);
    setScale(Math.max(4e-6, s * 0.5));
  }

  if (!supported) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-btn border border-line2 bg-surface p-6 text-center font-mono text-[13px] text-ink3">
        Your browser can&apos;t run WebGL, so this GPU piece is unavailable. The
        Mandelbrot set above renders the same fractal on the CPU.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        onClick={onClick}
        className="aspect-square w-full cursor-crosshair rounded-btn border border-line2"
        role="img"
        aria-label="GPU Mandelbrot deep-zoom explorer"
      />
      <p className="font-mono text-[11px] text-ink3">
        click to zoom in · scroll to zoom · zoom {(1.5 / scale).toExponential(1)}×
      </p>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setCenter([p.cx, p.cy]);
              setScale(p.scale);
            }}
            className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
          >
            {p.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setScale((s) => Math.min(2, s * 2))}
          className="rounded-full border border-line2 px-2.5 py-1 font-mono text-[11px] text-ink2 transition-colors hover:border-accent hover:text-accent"
        >
          zoom out
        </button>
      </div>
      <Slider label="iterations" min={80} max={800} step={10} value={maxIter} onChange={setMaxIter} display={String(maxIter)} />
      <Slider label="palette" min={0} max={1} step={0.01} value={offset} onChange={setOffset} display={offset.toFixed(2)} />
    </div>
  );
}
