import { useTrackContext } from "@/context/TrackContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const SelectedTrack = () => {
  const { selectedTrack } = useTrackContext();

  return (
    <AnimatePresence mode="wait">
      {selectedTrack && (
        <>
          <motion.div
            key={selectedTrack.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, ease: "easeOut" },
            }}
            exit={{ opacity: 0 }}
            className="absolute top-16 left-16 flex gap-4 p-4 z-50 bg-[#F1F1F1] rounded-md shadow-sm"
          >
            {/* IMAGE COVER OF THE TRACK */}
            <a href={selectedTrack.external_urls.spotify} target="_blank">
              <motion.div
                key={selectedTrack.id + "Image"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                }}
                exit={{ opacity: 0 }}
                className="rounded-sm overflow-hidden relative group w-24 h-24 cursor-pointer"
              >
                <Image
                  src={selectedTrack.album.images[0].url}
                  width={64}
                  height={64}
                  alt="Track cover"
                  className="w-full h-full object-cover"
                />

                <div className="bg-[#171717] bg-opacity-0 flex items-center justify-center  group-hover:bg-opacity-30 transition-all duration-300 ease-in-out absolute top-0 left-0 w-full h-full">
                  <Image
                    src="/img/spotify-solid-white.svg"
                    width={32}
                    height={32}
                    alt="Play button"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:delay-75"
                  />
                </div>
              </motion.div>
            </a>

            {/* TRACK NAME AND ARTIST */}
            <div className="flex flex-col">
              <motion.h3
                key={selectedTrack.id + selectedTrack.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-lg font-medium w-40 overflow-hidden text-nowrap"
              >
                {selectedTrack.name}
              </motion.h3>
              <motion.p
                key={selectedTrack.id + selectedTrack.artists[0].name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
                className="text-[#9C9A9A] leading-tight"
              >
                by {selectedTrack.artists[0].name}
              </motion.p>
            </div>
          </motion.div>

          {/* AUDIO PREVIEW OF THE SELECTED TRACK */}
          <audio
            src={selectedTrack.preview_url}
            autoPlay
            className="hidden"
          ></audio>
        </>
      )}
    </AnimatePresence>
  );
};

export default SelectedTrack;
