"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface AnimatedButtonProps {
  generateLink: () => void;
  isGeneratingLink: boolean;
  copiedToClipboard: boolean;
  generatedLink?: string;
}

export default function GenerateLinkButton({
  generateLink,
  isGeneratingLink,
  copiedToClipboard,
  generatedLink,
}: AnimatedButtonProps) {
  const [width, setWidth] = useState("auto");

  const getButtonText = () => {
    if (isGeneratingLink) return "Generating...";
    if (copiedToClipboard) return "Link copied to clipboard";
    return "Generate your link";
  };

  const getIconSrc = () => {
    if (isGeneratingLink) return "/icons/spinner.svg";
    if (copiedToClipboard) return "/icons/copy.svg";
    return "/icons/share.svg";
  };

  return (
    <>
      {/* BOUTON DESKTOP */}
      <motion.button
        layout
        initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          width,
          transition: { duration: 1, ease: "easeOut", delay: 1 },
        }}
        onClick={() => {
          if (!isGeneratingLink && !copiedToClipboard) generateLink();
        }}
        disabled={isGeneratingLink || copiedToClipboard}
        className="absolute z-50 bottom-16 left-16 max-sm:hidden flex items-center justify-center gap-1 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,1)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
        style={{
          cursor:
            isGeneratingLink || copiedToClipboard ? "not-allowed" : "pointer",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={getButtonText()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onLayoutAnimationComplete={() => setWidth("auto")}
          >
            {getButtonText()}
          </motion.span>
        </AnimatePresence>
        {/* <span>{getButtonText()}</span> */}
      </motion.button>

      {/* BOUTON MOBILE */}
      <motion.button
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          if (!isGeneratingLink && !copiedToClipboard) {
            generateLink();
          } else if (copiedToClipboard) {
            navigator.clipboard.writeText(generatedLink || "");
          }
        }}
        disabled={isGeneratingLink}
        className="absolute z-50 bottom-4 right-5 sm:hidden flex items-center justify-center p-3 bg-[#F1F1F1] rounded-md shadow-sm hover:shadow-md transition-all duration-300"
        style={{
          cursor: isGeneratingLink ? "not-allowed" : "pointer",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={getIconSrc()}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={getIconSrc()}
              alt="Button icon"
              width={15}
              height={15}
              className="w-4 h-auto"
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
