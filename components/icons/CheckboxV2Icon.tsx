import { SVGProps } from 'react';

export default function CheckboxV2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H14C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V4Z"
        fill="url(#paint0_linear_48_495)"
      />
      <g clipPath="url(#clip0_48_495)">
        <path
          d="M6.75 12.1275L3.6225 9L2.5575 10.0575L6.75 14.25L15.75 5.25L14.6925 4.1925L6.75 12.1275Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_48_495"
          x1="9"
          y1="0"
          x2="9"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DF4141" />
          <stop offset="1" stopColor="#912A2A" />
        </linearGradient>
        <clipPath id="clip0_48_495">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
