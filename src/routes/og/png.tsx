import { createFileRoute } from "@tanstack/react-router";
import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";

import type { ReactNode } from "react";

// Brand colors from globals.css
const COLORS = {
  background: "#0a0a0f",
  primary: "#6342ba", // hsla(248, 62%, 44%)
  secondary: "#7c5cd1", // hsla(248, 62%, 58%)
  white: "#ffffff",
  muted: "#9ca3af",
  subtle: "#6b7280",
};

// Input limits to prevent rendering issues
const MAX_TITLE_LENGTH = 100;
const MAX_SUBTITLE_LENGTH = 200;
const FETCH_TIMEOUT_MS = 10000;

// Cached resources
let fontCache: ArrayBuffer | null = null;
let wasmInitialized = false;

// Single initialization promise to prevent race conditions
let initPromise: Promise<void> | null = null;

/**
 * Fetch with timeout using AbortController
 */
async function fetchWithTimeout(
  url: string,
  timeout: number = FETCH_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Initialize WASM module (called only once)
 */
async function loadWasm(): Promise<void> {
  if (wasmInitialized) return;

  const wasmResponse = await fetchWithTimeout(
    "https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm"
  );

  if (!wasmResponse.ok) {
    throw new Error(`Failed to fetch WASM module: ${wasmResponse.status}`);
  }

  const wasmBuffer = await wasmResponse.arrayBuffer();
  await initWasm(wasmBuffer);
  wasmInitialized = true;
}

/**
 * Load Inter font (called only once)
 */
async function loadFont(): Promise<void> {
  if (fontCache) return;

  // Fetch Inter Regular font from jsDelivr CDN
  // Using weight 400 only - title will use 400 weight (Satori doesn't synthesize bold)
  const fontResponse = await fetchWithTimeout(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-400-normal.woff"
  );

  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch font: ${fontResponse.status}`);
  }

  fontCache = await fontResponse.arrayBuffer();
}

/**
 * Ensure all resources are initialized (thread-safe)
 * Uses a single promise to prevent race conditions from concurrent requests
 */
async function ensureInitialized(): Promise<void> {
  if (!initPromise) {
    // Load WASM and font in parallel
    initPromise = Promise.all([loadWasm(), loadFont()]).then(() => {
      // void - just ensure both complete
    });
  }
  return initPromise;
}

/**
 * Sanitize input to prevent rendering issues with very long text
 */
function sanitizeInput(
  value: string | null,
  defaultValue: string,
  maxLength: number
): string {
  const text = value?.trim() || defaultValue;
  if (text.length <= maxLength) return text;
  // Truncate and add ellipsis
  return text.slice(0, maxLength - 1).trim() + "…";
}

// Generate hexagon SVG path
function createHexagonPath(cx: number, cy: number, size: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join("L")}Z`;
}

// OG Image component
function OGImage({ title, subtitle }: { title: string; subtitle: string }) {
  // Create hexagon pattern paths for top-right corner
  const hexagons: { cx: number; cy: number; size: number }[] = [];
  const hexSize = 40;
  const spacing = hexSize * 1.8;

  // Generate hexagon grid for top-right area
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const offsetX = row % 2 === 0 ? 0 : spacing / 2;
      const cx = 50 + col * spacing + offsetX;
      const cy = 60 + row * (hexSize * 1.5);
      hexagons.push({ cx, cy, size: hexSize });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.background,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hexagon pattern overlay (top-right) */}
      <svg
        width="500"
        height="300"
        viewBox="0 0 500 300"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          opacity: 0.12,
        }}
      >
        {hexagons.map((hex, i) => (
          <path
            key={i}
            d={createHexagonPath(hex.cx, hex.cy, hex.size)}
            fill="none"
            stroke={COLORS.secondary}
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Purple gradient glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "200px",
          background: `linear-gradient(to top, ${COLORS.primary}30, transparent)`,
        }}
      />

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          padding: "60px",
        }}
      >
        {/* Top section with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* CPU/chip icon container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: `${COLORS.primary}20`,
              border: `2px solid ${COLORS.primary}40`,
            }}
          >
            {/* Simple CPU icon using SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect
                x="6"
                y="6"
                width="12"
                height="12"
                rx="2"
                stroke={COLORS.secondary}
                strokeWidth="2"
              />
              <path
                d="M9 6V3M15 6V3M9 21V18M15 21V18M6 9H3M6 15H3M21 9H18M21 15H18"
                stroke={COLORS.secondary}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="9"
                y="9"
                width="6"
                height="6"
                rx="1"
                fill={COLORS.secondary}
              />
            </svg>
          </div>
        </div>

        {/* Middle section with title and subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
            marginTop: "40px",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 400,
              color: COLORS.white,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: COLORS.muted,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom section with branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          {/* Author tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Avatar placeholder (circle) */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: COLORS.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.white,
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              S
            </div>
            {/* Author name */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: COLORS.white,
              }}
            >
              Sunday Ogbonna
            </div>
          </div>
          {/* Site URL */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: COLORS.subtle,
            }}
          >
            ogbonna.dev
          </div>
        </div>
      </div>
    </div>
  );
}

async function generateOGImage(
  title: string,
  subtitle: string
): Promise<Uint8Array> {
  // Ensure WASM and font are loaded (parallel, thread-safe)
  await ensureInitialized();

  // fontCache is guaranteed to be set after ensureInitialized()
  const fontData = fontCache!;

  // Generate SVG with Satori
  const svg = await satori(OGImage({ title, subtitle }) as ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });

  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

export const Route = createFileRoute("/og/png")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);

          // Sanitize inputs to prevent rendering issues with very long text
          const title = sanitizeInput(
            url.searchParams.get("title"),
            "Software Engineer",
            MAX_TITLE_LENGTH
          );
          const subtitle = sanitizeInput(
            url.searchParams.get("subtitle"),
            "Building modern web experiences",
            MAX_SUBTITLE_LENGTH
          );

          const pngBuffer = await generateOGImage(title, subtitle);

          return new Response(Buffer.from(pngBuffer), {
            headers: {
              "Content-Type": "image/png",
              "Cache-Control":
                "public, max-age=3600, stale-while-revalidate=86400",
            },
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("OG Image generation error:", error);

          // Return error with cache headers to prevent hammering on failures
          return new Response("Error generating image", {
            status: 500,
            headers: {
              "Content-Type": "text/plain",
              "Cache-Control": "no-store, max-age=0",
            },
          });
        }
      },
    },
  },
});
