import { Search, Shield } from "lucide-react";

interface WiseBiteLogoProps {
  size?: number;
}

export function WiseBiteLogo({ size = 40 }: WiseBiteLogoProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glossy">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield background */}
        <path
          d="M50 10 L75 20 L75 45 Q75 70 50 85 Q25 70 25 45 L25 20 Z"
          fill="url(#emeraldGradient)"
          filter="url(#glossy)"
        />

        {/* Glossy highlight on shield */}
        <path
          d="M50 10 L70 18 L70 40 Q70 55 50 65 Q40 58 35 50 L35 20 Z"
          fill="white"
          opacity="0.2"
        />

        {/* Magnifying glass handle */}
        <line
          x1="63"
          y1="58"
          x2="72"
          y2="67"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Magnifying glass circle */}
        <circle
          cx="55"
          cy="50"
          r="13"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />

        {/* Bite mark (small circle cutout simulation) */}
        <circle
          cx="42"
          cy="40"
          r="8"
          fill="#E0FFF5"
        />
        <circle
          cx="37"
          cy="42"
          r="4"
          fill="#E0FFF5"
        />
        <circle
          cx="46"
          cy="42"
          r="4"
          fill="#E0FFF5"
        />
      </svg>
    </div>
  );
}
