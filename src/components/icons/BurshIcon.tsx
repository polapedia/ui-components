import type { SVGProps } from 'react';

export default function BurshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2857 16.2817L9.49622 12.9979L21.4962 0.519775L24.6541 3.8035L13.2857 16.2817Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
      <path
        d="M3.18043 18.9086C3.18043 20.4847 1.49622 21.3166 0.654114 21.5355C5.07517 29.4164 14.5489 19.5653 10.1278 16.2816C5.70675 12.9978 3.18043 16.9383 3.18043 18.9086Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
