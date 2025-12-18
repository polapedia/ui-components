import { SVGProps } from "react";

export default function CheckmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 14 14" fill="none">
      <path
        d="M3 8L6 11L11 3.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 group-has-checked:opacity-100"
      />
      <path
        d="M3 7H11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 group-has-indeterminate:opacity-100"
      />
    </svg>
  );
}
