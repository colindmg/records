import { motion } from "framer-motion";
import Image from "next/image";
import HoveredTrack from "./HoveredTrack";
import Indicators from "./Indicators";
import SelectedTrack from "./SelectedTrack";

interface InterfaceProps {
  itemsCount: number;
}

const Interface: React.FC<InterfaceProps> = ({ itemsCount }) => {
  return (
    <>
      {/* TITLE */}
      <a href="/">
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { delay: 0.8, duration: 1, ease: "easeOut" },
          }}
          className="absolute flex items-center gap-4 max-sm:gap-2 top-16 left-16 z-50 max-sm:top-5 max-sm:left-1/2 max-sm:-translate-x-1/2"
        >
          <Image
            src="/img/logoblack.svg"
            width={40}
            height={40}
            alt="Records. Logo"
            className="w-10 h-10 max-sm:w-6 max-sm:h-6"
          />
          <h1 className="text-3xl max-md:text-2xl max-sm:text-lg">
            <span className="font-extrabold">Re</span>cords.
          </h1>
        </motion.div>
      </a>

      {/* SELECTED TRACK */}
      <SelectedTrack />

      {/* HOVERED TRACK */}
      <HoveredTrack />

      {/* INDICATORS */}
      <Indicators itemsCount={itemsCount} />

      {/* BLUR SHAPES */}
      <div className="pointer-events-none select-none">
        <Image
          src="/img/topright.svg"
          width={682}
          height={381}
          alt="Blurry shape on the top right corner"
          className="absolute top-0 right-0 z-10"
        />
        <Image
          src="/img/bottomleft.svg"
          width={856}
          height={433}
          alt="Blurry shape on the bottom left corner"
          className="absolute bottom-0 left-0 z-10"
        />
      </div>
    </>
  );
};

export default Interface;
