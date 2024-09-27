"use client";

import { motion } from "framer-motion";
import React from "react";

interface AudioAnimatedIconProps {
  isPlaying: boolean;
}

const AudioAnimatedIcon: React.FC<AudioAnimatedIconProps> = ({ isPlaying }) => {
  const barVariants = {
    playing: (i: number) => ({
      height: ["5px", "15px", "5px"],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1,
        ease: "easeInOut",
        delay: i % 2 ? 0.2 : 0,
      },
    }),
    paused: {
      height: "5px",
    },
  };

  return (
    <div className="flex items-center h-5">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[2px] mx-[1px] bg-[#171717] rounded-full"
          initial="paused"
          animate={isPlaying ? "playing" : "paused"}
          variants={barVariants}
          custom={i}
        />
      ))}
    </div>
  );
};

export default AudioAnimatedIcon;
