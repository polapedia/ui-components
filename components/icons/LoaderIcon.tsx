import { SVGProps } from "react";

export default function LoaderIcon({
  width = 165,
  height = 165,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 165 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g
        clipPath="url(#paint0_angular_943_1022_clip_path)"
        data-figma-skip-parse="true">
        <g transform="matrix(0 0.0825 -0.0825 0 82.5 82.5)">
          <foreignObject
            x="-1000"
            y="-1000"
            width="2000"
            height="2000"
            xmlns="http://www.w3.org/1999/xhtml">
            <div
              style={{
                background:
                  "conic-gradient(from 90deg, rgba(223, 65, 65, 1) 0deg, rgba(255, 228, 228, 0) 360deg)",
                height: "100%",
                width: "100%",
                opacity: 1,
              }}
            />
          </foreignObject>
        </g>
      </g>

      <path d="M82.5 0C128.063 0 165 36.9365 165 82.5C165 128.063 128.063 165 82.5 165C36.9365 165 0 128.063 0 82.5C0 36.9365 36.9365 0 82.5 0ZM82.5 25C50.7436 25 25 50.7436 25 82.5C25 114.256 50.7436 140 82.5 140C114.256 140 140 114.256 140 82.5C140 50.7436 114.256 25 82.5 25Z" />

      <circle cx="83.5" cy="152.5" r="12.5" fill="#E04747" />

      <defs>
        <clipPath id="paint0_angular_943_1022_clip_path">
          <path d="M82.5 0C128.063 0 165 36.9365 165 82.5C165 128.063 128.063 165 82.5 165C36.9365 165 0 128.063 0 82.5C0 36.9365 36.9365 0 82.5 0ZM82.5 25C50.7436 25 25 50.7436 25 82.5C25 114.256 50.7436 140 82.5 140C114.256 140 140 114.256 140 82.5C140 50.7436 114.256 25 82.5 25Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
