"use client";

import { cameraSpeed, scrollOffset } from "@/lib/utils";
import { motion, useMotionValueEvent } from "framer-motion";
import React, { useState } from "react";

interface IndicatorsProps {
  itemsCount: number;
}

const Indicators: React.FC<IndicatorsProps> = ({ itemsCount }) => {
  const [scrollIndexValue, setScrollIndexValue] = useState<number>(0);
  const [cameraSpeedZ, setCameraSpeedZ] = useState(0);

  useMotionValueEvent(scrollOffset, "change", (latest) => {
    setScrollIndexValue(latest * (itemsCount - 1));
  });

  useMotionValueEvent(cameraSpeed, "change", (latest) => {
    setCameraSpeedZ(latest);
  });

  return (
    <div className="absolute bottom-16 right-16  flex h-8 items-center gap-2 opacity-100 transition-opacity duration-500">
      {Array.from({ length: itemsCount }, (_, index) => (
        <motion.div
          key={index}
          className="w-[2px] rounded-full bg-[#9C9A9A]/50"
          animate={{
            height: getHeight(index, scrollIndexValue, cameraSpeedZ),
            backgroundColor: getColor(index, scrollIndexValue),
          }}
          // transition={{ type: "spring", stiffness: 2000, damping: 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const getHeight = (
  index: number,
  scrollIndex: number,
  cameraSpeed: number
): string => {
  const distance = Math.abs(index - scrollIndex);
  if (distance < 0.5) return `${17 + Math.abs(cameraSpeed) * 4}px`;
  if (distance < 1.5) return `${17 + Math.abs(cameraSpeed) * 3}px`;
  if (distance < 2.5) return `${17 + Math.abs(cameraSpeed) * 2}px`;
  if (distance < 3.5) return `${17 + Math.abs(cameraSpeed) * 1}px`;
  return "17px";
};

const getColor = (index: number, scrollIndex: number): string => {
  const distance = Math.abs(index - scrollIndex);
  // if (distance < 0.5) return "rgb(23, 23, 23)"; // Almost black
  if (distance < 0.5) return "rgba(156, 154, 154, 0.9)";
  if (distance < 1.5) return "rgba(156, 154, 154, 0.7)";
  if (distance < 2.5) return "rgba(156, 154, 154, 0.5)";
  if (distance < 3.5) return "rgba(156, 154, 154, 0.3)";
  return "rgba(156, 154, 154, 0.2)"; // Lightest color
};

export default Indicators;
