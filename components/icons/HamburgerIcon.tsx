import { SVGProps } from 'react';

export default function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_101_1313)">
        <path
          d="M7 11H33"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 16L33 16"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 21L33 21"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_101_1313">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
