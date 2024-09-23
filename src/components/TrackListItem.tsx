import { Track } from "@/lib/types";
import { fragmentShader, vertexShader } from "@/shaders/shader";
import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";

interface TrackListItemProps {
  track: Track;
  index: number;
}

const TrackListItem: React.FC<TrackListItemProps> = ({ track, index }) => {
  const texture = useTexture(track.album.images[0].url);

  const uniforms = useRef({
    uTexture: { value: texture },
  });

  return (
    <mesh key={track.id} position={[0, 0.5, -index * 0.5]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default TrackListItem;
