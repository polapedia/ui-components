import { ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div">;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  const hasRounded = className?.includes("rounded");

  const classes = [
    "animate-pulse bg-loader-base",
    !hasRounded && "rounded-md",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
