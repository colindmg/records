import { motionValue } from "framer-motion";

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const scrollOffset = motionValue(0);
const cameraSpeed = motionValue(0);

export { cameraSpeed, clamp, lerp, scrollOffset };
