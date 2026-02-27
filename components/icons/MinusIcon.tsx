import { SVGProps, useId } from 'react';

export default function MinusIcon(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  const gradientId = `minus-gradient-${id}`;

  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33337 8H12.6667"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="8.00004"
          y1="8"
          x2="8.00004"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </svg>
  );
}
