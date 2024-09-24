import { useTrackContext } from "@/context/TrackContext";
import { AnimatePresence, motion } from "framer-motion";

const HoveredTrack = () => {
  // CONTEXT TRACKS
  const { hoveredTrack } = useTrackContext();

  return (
    <AnimatePresence mode="sync">
      {hoveredTrack && (
        <div
          key={hoveredTrack.id}
          className="absolute bottom-16 right-16 flex flex-col items-end z-50"
        >
          <motion.h3
            key={hoveredTrack.id + hoveredTrack.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-xl font-semibold"
          >
            {hoveredTrack.name}
          </motion.h3>
          <motion.p
            key={hoveredTrack.id + hoveredTrack.artists[0].name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.05, ease: "easeInOut" }}
            className="text-[#9C9A9A]"
          >
            {`${hoveredTrack.artists[0].name} • ${
              hoveredTrack.album.album_type !== "SINGLE"
                ? hoveredTrack.album.name
                : "Single"
            }`}
          </motion.p>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HoveredTrack;
