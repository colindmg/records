// import { scrollOffset } from "@/lib/utils";
// import { useMotionValueEvent } from "framer-motion";
// import React, { useState } from "react";

// interface IndicatorsProps {
//   itemsCount: number;
// }

// const Indicators: React.FC<IndicatorsProps> = ({ itemsCount }) => {
//   const [scrollIndexValue, setScrollIndexValue] = useState<number>(0);

//   useMotionValueEvent(scrollOffset, "change", (latest) => {
//     const index = Math.round(latest * (itemsCount - 1));
//     setScrollIndexValue(index);
//   });

//   return (
//     <div className="h-8 absolute bottom-5 right-20 flex items-center gap-2 opacity-100 transition-opacity duration-500">
//       {Array.from({ length: itemsCount }, (_, index) => (
//         <div
//           key={index}
//           className={`w-[2px] h-5 rounded-full bg-[#9C9A9A]/50 transition-all duration-300 ${
//             index === scrollIndexValue ? "bg-neutral-900 h-8" : ""
//           } ${
//             index === scrollIndexValue - 1 || index === scrollIndexValue + 1
//               ? "h-6 bg-[#9C9A9A]/50"
//               : ""
//           } ${
//             index === scrollIndexValue - 2 || index === scrollIndexValue + 2
//               ? "h-[22px] bg-[#9C9A9A]/25"
//               : ""
//           }`}
//         ></div>
//       ))}
//     </div>
//   );
// };

// export default Indicators;

"use client";

import { scrollOffset } from "@/lib/utils";
import { motion, useMotionValueEvent } from "framer-motion";
import React, { useState } from "react";

interface IndicatorsProps {
  itemsCount: number;
}

const Indicators: React.FC<IndicatorsProps> = ({ itemsCount }) => {
  const [scrollIndexValue, setScrollIndexValue] = useState<number>(0);

  useMotionValueEvent(scrollOffset, "change", (latest) => {
    setScrollIndexValue(latest * (itemsCount - 1));
  });

  return (
    <div className="absolute bottom-16 right-16  flex h-8 items-center gap-2 opacity-100 transition-opacity duration-500">
      {Array.from({ length: itemsCount }, (_, index) => (
        <motion.div
          key={index}
          className="w-[2px] rounded-full bg-[#9C9A9A]/50"
          animate={{
            height: getHeight(index, scrollIndexValue),
            backgroundColor: getColor(index, scrollIndexValue),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      ))}
    </div>
  );
};

const getHeight = (index: number, scrollIndex: number): string => {
  const distance = Math.abs(index - scrollIndex);
  if (distance < 0.5) return "25px"; // Max height
  if (distance < 1.5) return "23px";
  if (distance < 2.5) return "21px";
  if (distance < 3.5) return "19px";
  return "17px"; // Min height
};

const getColor = (index: number, scrollIndex: number): string => {
  const distance = Math.abs(index - scrollIndex);
  if (distance < 0.5) return "rgb(23, 23, 23)"; // Almost black
  if (distance < 1.5) return "rgba(156, 154, 154, 0.7)";
  if (distance < 2.5) return "rgba(156, 154, 154, 0.5)";
  if (distance < 3.5) return "rgba(156, 154, 154, 0.3)";
  return "rgba(156, 154, 154, 0.2)"; // Lightest color
};

export default Indicators;
