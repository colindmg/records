import { motion } from "framer-motion";

interface LoaderScreenProps {
  message: string;
}

const LoaderScreen = ({ message }: LoaderScreenProps) => {
  return (
    <div
      key={"loaderScreenContainer"}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
    >
      <motion.p
        key={"loaderScreenParagraph"}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="text-[#9C9A9A] animate-pulse"
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoaderScreen;
