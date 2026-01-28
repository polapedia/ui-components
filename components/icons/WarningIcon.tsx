import { SVGProps } from 'react';

export default function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_875_926)">
        <g clipPath="url(#clip1_875_926)">
          <path
            d="M0.5 10.5H11.5L6 1L0.5 10.5ZM6.5 9H5.5V8H6.5V9ZM6.5 7H5.5V5H6.5V7Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_875_926">
          <rect width="12" height="12" fill="white" />
        </clipPath>
        <clipPath id="clip1_875_926">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
