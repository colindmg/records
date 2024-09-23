const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export { clamp, lerp };
