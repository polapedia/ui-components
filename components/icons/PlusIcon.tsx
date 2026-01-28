import { SVGProps } from 'react';

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M8.00004 3.33333V12.6667M3.33337 7.99999H12.6667"
        stroke="url(#paint0_linear_518_293)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_518_293"
          x1="8.00004"
          y1="3.33333"
          x2="8.00004"
          y2="12.6667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </svg>
  );
}
