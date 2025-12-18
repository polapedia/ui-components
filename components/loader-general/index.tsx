import { ComponentProps } from "react";
import LoaderIcon from "../icons/LoaderIcon";

type Size = "sm" | "md" | "lg";

interface LoaderGeneralProps extends ComponentProps<"div"> {
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
};

export default function LoaderGeneral({
  size = "md",
  className,
  ...props
}: LoaderGeneralProps) {
  const classes = ["inline-flex items-center gap-3", className || ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite" {...props}>
      <LoaderIcon
        className={["animate-spin", sizeClasses[size], "text-accents-red"]
          .filter(Boolean)
          .join(" ")}
        style={{ animationDirection: "reverse" }}
      />
    </div>
  );
}
