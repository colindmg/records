// import { useTrackContext } from "@/context/TrackContext";
// import { AnimatePresence, motion } from "framer-motion";

// const HoveredTrack = () => {
//   // CONTEXT TRACKS
//   const { hoveredTrack, prevHoveredTrack } = useTrackContext();

//   const hoveredTrackArtistAlbum = `${hoveredTrack?.artists[0].name} • ${
//     hoveredTrack?.album.album_type !== "SINGLE"
//       ? hoveredTrack?.album.name
//       : "Single"
//   }`;

//   const prevHoveredTrackArtistAlbum = `${prevHoveredTrack?.artists[0].name} • ${
//     prevHoveredTrack?.album.album_type !== "SINGLE"
//       ? prevHoveredTrack?.album.name
//       : "Single"
//   }`;

//   return (
//     <AnimatePresence>
//       {/* CURRENTLY HOVERED TRACK */}
//       {hoveredTrack && (
//         <div className="absolute bottom-16 right-16 flex flex-col items-end z-50">
//           <motion.h3
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="text-xl font-semibold"
//           >
//             {hoveredTrack.name}
//           </motion.h3>
//           <div className="flex gap-0.5">
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
//               exit={{ opacity: 0, y: -10, transition: { delay: 0.1 } }}
//               className="text-[#9C9A9A]"
//             >
//               {hoveredTrackArtistAlbum}
//             </motion.p>
//           </div>
//         </div>
//       )}

//       {/* PREVIOUSLY HOVERED TRACK */}
//       {prevHoveredTrack && (
//         <div className="absolute bottom-16 right-16 flex flex-col items-end z-50">
//           <motion.h3
//             initial={{ opacity: 1, y: 0 }}
//             animate={{ opacity: 0, y: -10 }}
//             className="text-xl font-semibold"
//           >
//             {prevHoveredTrack.name}
//           </motion.h3>
//           <div className="flex gap-0.5">
//             <motion.p
//               initial={{ opacity: 1, y: 0 }}
//               animate={{ opacity: 0, y: -10, transition: { delay: 0.1 } }}
//               className="text-[#9C9A9A]"
//             >
//               {prevHoveredTrackArtistAlbum}
//             </motion.p>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default HoveredTrack;

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
