import loaderAnimation from "@/animations/loaderAnimation.json";
import { useLottie } from "lottie-react";

export default function LoaderCustom() {
  const defaultOptions = {
    animationData: loaderAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <div>
      <div className="w-full">{View}</div>
    </div>
  );
}
