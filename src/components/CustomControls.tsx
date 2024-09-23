import { clamp, lerp } from "@/lib/utils";
import { useFrame } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CustomControlsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraRef: React.RefObject<THREE.OrthographicCamera>;
  itemsCount: number;
}

const CustomControls: React.FC<CustomControlsProps> = ({
  canvasRef,
  cameraRef,
  itemsCount,
}) => {
  const [targetZ, setTargetZ] = useState(3);
  const previousZRef = useRef<number | null>(null);
  const [speedZ, setSpeedZ] = useState(0);

  // DÉSACTIVER LE TOUCH ACTION SUR LE CANVAS
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.touchAction = "none";
    }
  }, [canvasRef]);

  // GESTION DES ÉVÉNEMENTS
  useGesture(
    {
      // DÉPLACEMENT AU SCROLL
      onWheel: (state) => {
        const z = cameraRef.current?.position.z;
        const newZ = clamp(
          z ? z - state.delta[1] * 0.015 : 3,
          3 - 0.5 * (itemsCount - 1),
          3
        );
        setTargetZ(newZ);
      },
      // DÉPLACEMENT AU DRAG HORIZONTAL
      onDrag: (state) => {
        const z = cameraRef.current?.position.z;
        const newZ = clamp(
          z ? z + state.delta[0] * 0.015 : 3,
          3 - 0.5 * (itemsCount - 1),
          3
        );
        setTargetZ(newZ);
      },
      onDragEnd: () => {
        console.log("Speed Z:", speedZ);
      },
    },
    {
      target: canvasRef.current ? canvasRef.current : undefined,
    }
  );

  // DÉPLACEMENT DE LA CAMÉRA
  useFrame((state, delta) => {
    const z = cameraRef.current?.position.z;
    const factor = 0.05;
    if (cameraRef.current) {
      cameraRef.current.position.z = lerp(z ? z : 3, targetZ, factor);

      // Calcul de la vitesse instantanée sur l'axe Z
      const currentZ = cameraRef.current.position.z;
      if (previousZRef.current !== null && delta > 0) {
        const velocityZ = (currentZ - previousZRef.current) / delta;
        setSpeedZ(velocityZ);
      }
      previousZRef.current = currentZ;
    }
  });

  return <></>;
};

export default CustomControls;
