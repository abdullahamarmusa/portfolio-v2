import { useId } from "react";

interface SimpleLogoProps {
  size?: number;
  className?: string;
}

/**
 * AM monogram — Version 01, "Primary Mark" (bolded).
 * A geometric "A" + "M" monogram with a vertical theme gradient,
 * a precise negative-space slash cut, and a subtle inner edge line.
 */
export function SimpleLogo({ size = 32, className = "" }: SimpleLogoProps) {
  const uid = useId();
  const clipId = `amClip-${uid}`;
  const maskId = `amMask-${uid}`;
  const gradId = `amGrad-${uid}`;

  return (
    <svg
      width={size}
      height={size * (200 / 315)}
      viewBox="0 0 315 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Abdullah Amar Musa logo"
      role="img"
    >
      <defs>
        {/* Vertical theme gradient applied to the A and M letters (violet → fuchsia) */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>

        {/* Slices the top of the miter spikes exactly at Y=40 to create
            perfectly flat, uniform-width geometric summits for the A and M. */}
        <clipPath id={clipId}>
          <rect x="0" y="40" width="315" height="120" />
        </clipPath>

        {/* The Engineering Cut — a perfect line traversing from the
            bottom-left outer boundary (30,160) to the top-right (285,40). */}
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="white" />
          <line
            x1="-20"
            y1="183.53"
            x2="335"
            y2="16.47"
            stroke="black"
            strokeWidth="10"
          />
        </mask>
      </defs>

      {/* Bolded primary monogram with gradient */}
      <g
        fill="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        stroke={`url(#${gradId})`}
        strokeWidth="26"
        clipPath={`url(#${clipId})`}
        mask={`url(#${maskId})`}
      >
        {/* Letter A */}
        <path d="M 40,160 L 90,40 L 140,160" />
        <line x1="62" y1="115" x2="118" y2="115" />
        {/* Letter M */}
        <path d="M 175,160 L 175,40 L 225,130 L 275,40 L 275,160" />
      </g>
    </svg>
  );
}

export default SimpleLogo;