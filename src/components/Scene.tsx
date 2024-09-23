import { Track } from "@/lib/types";
import { OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import TrackListItem from "./TrackListItem";

interface SceneProps {
  trackList: Track[];
}

const Scene: React.FC<SceneProps> = ({ trackList }) => {
  // REFS
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

  // POSITION INITIALE DE LA CAMERA
  const [cameraX, cameraY, cameraZ] = [3, 3.75, 3];

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        left={-1.5 * (window.innerWidth / window.innerHeight)}
        right={1.5 * (window.innerWidth / window.innerHeight)}
        top={1.5}
        bottom={-1.5}
        near={3}
        far={10}
        position={[cameraX, cameraY, cameraZ]}
        rotation-order="YXZ"
        rotation-y={Math.PI / 4}
        rotation-x={Math.atan(-1 / Math.sqrt(2))}
      />
      <ambientLight />

      <group>
        {/* TRACKS */}
        {trackList.map((track, index) => {
          return <TrackListItem key={track.id} track={track} index={index} />;
        })}
      </group>
    </>
  );
};

export default Scene;
