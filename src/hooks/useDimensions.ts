import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function useDimensions() {
  const width = useMotionValue(0);
  const height = useMotionValue(0);

  useEffect(() => {
    const updateDimensions = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, [height, width]);

  return { width, height };
}
