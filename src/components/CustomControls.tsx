import { lerp } from "@/lib/utils";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import React, { useRef } from "react";
import * as THREE from "three";

interface CustomControlsProps {
  // canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraRef: React.RefObject<THREE.OrthographicCamera>;
  itemsCount: number;
  cameraSpeedRef: MotionValue<number>;
}

const CustomControls: React.FC<CustomControlsProps> = ({
  // canvasRef,
  cameraRef,
  itemsCount,
  cameraSpeedRef,
}) => {
  const previousZRef = useRef<number | null>(null);
  const scroll = useScroll();
  const maxZ = 3;
  const minZ = 3 - 0.5 * (itemsCount - 1);
  const factor = 0.05;

  useFrame((state, delta) => {
    if (cameraRef.current) {
      const targetZ = lerp(maxZ, minZ, scroll.offset);
      const z = cameraRef.current.position.z;
      const newZ = lerp(z, targetZ, factor);

      cameraRef.current.position.z = newZ;

      if (previousZRef.current !== null && delta > 0) {
        const velocityZ = (newZ - previousZRef.current) / delta;
        cameraSpeedRef.set(velocityZ);
      }
      previousZRef.current = newZ;
    }

    // POUR QUE LE HOVER EFFECT MARCHE AU SCROLL
    state.events.update?.();
  });

  return null;
};

export default CustomControls;
