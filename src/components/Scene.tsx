import useDimensions from "@/hooks/useDimensions";
import { Track } from "@/lib/types";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  OrthographicCamera,
  useTexture,
} from "@react-three/drei";
import { useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import * as THREE from "three";
import CustomControls from "./CustomControls";
import TrackListItem from "./TrackListItem";

interface SceneProps {
  trackList: Track[];
}

const Scene: React.FC<SceneProps> = ({ trackList }) => {
  // REFS
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

  // POSITION INITIALE DE LA CAMERA
  const [cameraX, cameraY, cameraZ] = [3, 3.75, 3];

  // ALPHAMAP TEXTURE POUR LES TRACKS
  const alphaMapTexture = useTexture("/textures/alphaMap.webp");

  // WINDOW DIMENSIONS
  const { width } = useDimensions();
  const [innerWidth, setInnerWidth] = useState<number>(width.get());

  useMotionValueEvent(width, "change", (latest) => {
    setInnerWidth(latest);
  });

  return (
    <>
      {/* PERFORMANCES */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        // zoom={275}
        zoom={innerWidth < 768 ? 200 : innerWidth > 1500 ? 300 : 275}
        near={2}
        far={10}
        position={[cameraX, cameraY, cameraZ]}
        rotation-order="YXZ"
        rotation-y={Math.PI / 4}
        rotation-x={Math.atan(-1 / Math.sqrt(2))}
      />

      <group>
        {/* TRACKS */}
        {trackList.map((track, index) => {
          return (
            <TrackListItem
              key={track.id}
              track={track}
              index={index}
              alphaMapTexture={alphaMapTexture}
            />
          );
        })}
      </group>

      <CustomControls cameraRef={cameraRef} itemsCount={trackList.length} />
    </>
  );
};

export default Scene;
