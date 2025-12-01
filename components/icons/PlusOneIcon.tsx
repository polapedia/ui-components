import { SVGProps } from "react";

export default function PlusOneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="8"
      height="7"
      viewBox="0 0 8 7"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 1.5H2V3.5H0V4.5H2V6.5H3V4.5H5V3.5H3V1.5ZM5.25 0.54V1.45L6.5 1.2V6.5H7.5V0L5.25 0.54Z"
        fill="currentColor"
      />
    </svg>
  );
}
