import { motion } from "framer-motion";

const LoaderScreen = () => {
  return (
    <div
      key={"loaderScreenContainer"}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
    >
      <motion.p
        key={"loaderScreenParagraph"}
        exit={{ opacity: 0 }}
        className="text-[#9C9A9A] animate-pulse"
      >
        Loading your top tracks...
      </motion.p>
    </div>
  );
};

export default LoaderScreen;
