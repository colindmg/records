import { useTrackContext } from "@/context/TrackContext";

const HoveredTrack = () => {
  // CONTEXT TRACKS
  const { hoveredTrack, selectedTrack } = useTrackContext();

  return (
    <div className="absolute top-5 left-5">
      {/* Affiche des informations sur la piste survolée ou sélectionnée */}
      {hoveredTrack && <p>Piste survolée: {hoveredTrack.name}</p>}
      {selectedTrack && <p>Piste sélectionnée: {selectedTrack.name}</p>}
    </div>
  );
};

export default HoveredTrack;
