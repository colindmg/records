import { useTrackContext } from "@/context/TrackContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SelectedTrack = () => {
  const { selectedTrack } = useTrackContext();

  // GESTION DE L'AUDIO
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    if (selectedTrack && audioRef.current) {
      audioRef.current.src = selectedTrack.preview_url;
      audioRef.current.play();

      const audio = audioRef.current;
      audio.volume = 0.1;
      if (!audio) return;

      const updateProgress = () => {
        const duration = audio.duration || 30;
        setProgress((audio.currentTime / duration) * 100);
        setRemainingTime(Math.ceil(duration - audio.currentTime));
      };

      audio.addEventListener("timeupdate", updateProgress);
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, [selectedTrack]);

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
            className="absolute top-16 left-16 flex items-center gap-4 p-4 z-50 bg-[#F1F1F1] rounded-md shadow-sm"
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
                className="rounded-sm overflow-hidden relative group h-20 w-20 cursor-pointer"
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
                className="text-lg font-medium w-40 line-clamp-1"
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

              {/* PROGRESS BAR */}
              <div className="flex items-center mt-1">
                <div className="w-full bg-white rounded-full h-1">
                  <div
                    className="bg-[#171717] h-1 rounded-full transition-all ease-in-out duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#9C9A9A] w-14 text-right">
                  -00:{remainingTime < 10 ? `0${remainingTime}` : remainingTime}
                </span>
              </div>
            </div>

            {/* AUDIO CONTROLS */}
            <audio ref={audioRef} autoPlay className="hidden" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SelectedTrack;
