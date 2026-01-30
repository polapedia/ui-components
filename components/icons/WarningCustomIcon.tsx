import { SVGProps } from 'react';

export default function WarningCustomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_349_1334)">
        <path
          d="M0.75 15.75H17.25L9 1.5L0.75 15.75ZM9.75 13.5H8.25V12H9.75V13.5ZM9.75 10.5H8.25V7.5H9.75V10.5Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_349_1334">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
