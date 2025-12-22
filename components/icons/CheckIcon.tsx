import { SVGProps } from "react";

export default function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_349_1359)">
        <path
          d="M10 2.5C5.86 2.5 2.5 5.86 2.5 10C2.5 14.14 5.86 17.5 10 17.5C14.14 17.5 17.5 14.14 17.5 10C17.5 5.86 14.14 2.5 10 2.5ZM8.5 13.75L4.75 10L5.8075 8.9425L8.5 11.6275L14.1925 5.935L15.25 7L8.5 13.75Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_349_1359">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(1 1)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
