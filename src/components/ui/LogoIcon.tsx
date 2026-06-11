interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className, size = 32 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D76D77" />
          <stop offset="100%" stopColor="#ffca7b" />
        </linearGradient>
        <clipPath id="r">
          <circle cx="16" cy="18" r="9" />
          <circle cx="9" cy="20" r="4.5" />
          <circle cx="23" cy="20" r="4.5" />
          <ellipse cx="10" cy="8" rx="4" ry="5" transform="rotate(-10 10 8)" />
          <ellipse cx="22" cy="8" rx="4" ry="5" transform="rotate(10 22 8)" />
        </clipPath>
      </defs>
      <rect width="32" height="32" fill="url(#lg)" clipPath="url(#r)" />
    </svg>
  );
}
