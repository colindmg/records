import { Track } from "@/lib/types";
import { OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import CustomControls from "./CustomControls";
import TrackListItem from "./TrackListItem";
import { useMotionValue } from "framer-motion";

interface SceneProps {
  trackList: Track[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Scene: React.FC<SceneProps> = ({ trackList, canvasRef }) => {
  // STATE
  // const [cameraSpeed, setCameraSpeed] = useState<number>(0);

  // REFS
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  // const cameraSpeedRef = useRef<number>(0);
  const cameraSpeedRef = useMotionValue(0);

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
              cameraSpeedRef={cameraSpeedRef}
            />
          );
        })}
      </group>

      <CustomControls
        canvasRef={canvasRef}
        cameraRef={cameraRef}
        itemsCount={trackList.length}
        cameraSpeedRef={cameraSpeedRef}
      />
    </>
  );
};

export default Scene;
