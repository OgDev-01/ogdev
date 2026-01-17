import { ImageResponse } from "@vercel/og";
import { defineEventHandler, getQuery, setHeader } from "h3";
import React from "react";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Get dynamic text from query params
  const title = (query.title as string) || "Software Engineer";
  const subtitle =
    (query.subtitle as string) || "Building modern web experiences";

  // Truncate if too long
  const displayTitle =
    title.length > 50 ? title.substring(0, 50) + "..." : title;
  const displaySubtitle =
    subtitle.length > 80 ? subtitle.substring(0, 80) + "..." : subtitle;

  const element = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0f",
        position: "relative",
        padding: "60px 70px",
      }}
    >
      {/* Geometric hexagon pattern in top-right */}
      <svg
        width="500"
        height="400"
        viewBox="0 0 500 400"
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          opacity: 0.12,
        }}
      >
        {/* Hexagon grid pattern */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => {
            const x = col * 100 + (row % 2) * 50;
            const y = row * 90;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x + 50},${y} ${x + 93},${y + 25} ${x + 93},${y + 75} ${x + 50},${y + 100} ${x + 7},${y + 75} ${x + 7},${y + 25}`}
                fill="none"
                stroke="rgba(147, 112, 219, 0.5)"
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>

      {/* Bottom gradient glow - purple/violet brand colors */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "350px",
          background:
            "linear-gradient(90deg, rgba(99, 66, 186, 0.35) 0%, rgba(124, 92, 209, 0.25) 35%, rgba(147, 112, 219, 0.18) 65%, rgba(99, 66, 186, 0.12) 100%)",
          filter: "blur(80px)",
        }}
      />

      {/* Icon container - top left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "18px",
          marginBottom: "40px",
        }}
      >
        {/* CPU/Chip icon */}
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer square */}
          <rect x="4" y="4" width="16" height="16" rx="2" />
          {/* Inner square */}
          <rect x="8" y="8" width="8" height="8" rx="1" />
          {/* Top pins */}
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          {/* Bottom pins */}
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          {/* Left pins */}
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="15" x2="4" y2="15" />
          {/* Right pins */}
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="15" x2="23" y2="15" />
        </svg>
      </div>

      {/* Main title */}
      <div
        style={{
          fontSize: "52px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.15,
          marginBottom: "20px",
          maxWidth: "800px",
        }}
      >
        {displayTitle}
      </div>

      {/* Subtitle/description */}
      <div
        style={{
          fontSize: "22px",
          color: "rgba(255, 255, 255, 0.5)",
          lineHeight: 1.5,
          maxWidth: "700px",
        }}
      >
        {displaySubtitle}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "45px",
          left: "70px",
          right: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand tag - left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "6px",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          Sunday Ogbonna
        </div>

        {/* Logo - right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "20px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polygon points="12,2 22,20 2,20" fill="#7c5cd1" stroke="none" />
          </svg>
          ogbonna.dev
        </div>
      </div>
    </div>
  );

  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
  });

  const buffer = await response.arrayBuffer();

  setHeader(event, "Content-Type", "image/png");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

  return Buffer.from(buffer);
});
