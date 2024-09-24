import { useTrackContext } from "@/context/TrackContext";
import { Track } from "@/lib/types";
import { fragmentShader, vertexShader } from "@/shaders/shader";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import React, { useEffect, useRef, useState } from "react";

interface TrackListItemProps {
  track: Track;
  index: number;
  cameraSpeedRef: MotionValue<number>;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  track,
  index,
  cameraSpeedRef,
}) => {
  // STATES
  const [isHover, setIsHover] = useState(false);

  // MOTION VALUES
  const variants = {
    initial: { x: 0, y: 0 },
    appear: { x: 0, y: 0.5 },
    hover: { x: 0.2, y: 0.5 },
  };

  // CONTEXT FUNCTIONS
  const { setHoveredTrack, setPrevHoveredTrack, setSelectedTrack } =
    useTrackContext();

  // LOADING TEXTURE
  const texture = useTexture(track.album.images[0].url);

  // UNIFORMS
  const uniforms = useRef({
    uTexture: { value: texture },
    uOpacity: { value: 0 },
    uCameraSpeed: { value: cameraSpeedRef.get() || 0 },
  });

  // ANIMATION de l'uOpacity au montage du composant
  useEffect(() => {
    uniforms.current.uOpacity.value = 0;

    setTimeout(() => {
      const duration = 1000;
      const start = performance.now();

      // Fonction d'interpolation "easeInOutQuad"
      function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }

      function animate(time: number) {
        const elapsed = time - start;
        const t = Math.min(elapsed / duration, 0.85);

        const easedValue = easeInOutQuad(t);
        uniforms.current.uOpacity.value = easedValue;

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }, index * 75);
  }, [index]);

  // ANIMATION de décalage sur l'axe X au survol
  useEffect(() => {
    if (isHover) {
    }
  }, [isHover]);

  useFrame(() => {
    uniforms.current.uCameraSpeed.value = cameraSpeedRef.get();
  });

  return (
    <motion.mesh
      key={track.id}
      position={[0, 0.5, -index * 0.5]}
      variants={variants}
      initial="initial"
      animate={isHover ? "hover" : "appear"}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 20 },
        y: { duration: 1, delay: index * 0.05, type: "spring", damping: 12 },
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setIsHover(true);
        setHoveredTrack(track);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
        setIsHover(false);
        setHoveredTrack(null);
        setPrevHoveredTrack(track);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setSelectedTrack(track);
      }}
    >
      <planeGeometry args={[1, 1, 8, 8]} />
      <shaderMaterial
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </motion.mesh>
  );
};

export default TrackListItem;
