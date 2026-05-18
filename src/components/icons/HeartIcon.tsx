import type { SVGProps } from 'react';

export default function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 5.25C18.75 2.765 16.651 0.75 14.062 0.75C12.127 0.75 10.465 1.876 9.75 3.483C9.035 1.876 7.373 0.75 5.437 0.75C2.85 0.75 0.75 2.765 0.75 5.25C0.75 12.47 9.75 17.25 9.75 17.25C9.75 17.25 18.75 12.47 18.75 5.25Z"
        stroke={props.className?.includes('border') ? 'currentColor' : 'black'}
        fill="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
