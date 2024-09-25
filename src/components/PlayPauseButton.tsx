"use client";

import React from "react";

interface PausePlayButtonProps {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const PausePlayButton: React.FC<PausePlayButtonProps> = ({
  isPlaying,
  setIsPlaying,
}) => {
  return (
    <button
      className="flex items-center justify-center focus:outline-none"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 rounded-xl overflow-visible -translate-x-[3px]"
        style={{ color: "#171717" }}
      >
        <path
          className={`transform origin-center transition-all duration-300 ease-in-out ${
            isPlaying ? "scale-0" : "scale-100"
          }`}
          fill="currentColor"
          d="M8 6.5c0-.83.67-1.5 1.5-1.5.31 0 .61.1.85.28l7.5 5.5c.45.33.71.86.71 1.42 0 .56-.26 1.09-.71 1.42l-7.5 5.5c-.24.18-.54.28-.85.28-.83 0-1.5-.67-1.5-1.5V6.5z"
        />
        <rect
          className={`transform origin-center transition-all duration-300 ease-in-out ${
            isPlaying ? "scale-100" : "scale-0"
          }`}
          fill="currentColor"
          x="6"
          y="5"
          width="4"
          height="14"
          rx="3"
        />
        <rect
          className={`transform origin-center transition-all duration-300 ease-in-out ${
            isPlaying ? "scale-100" : "scale-0"
          }`}
          fill="currentColor"
          x="14"
          y="5"
          width="4"
          height="14"
          rx="3"
        />
      </svg>
    </button>
  );
};

export default PausePlayButton;
