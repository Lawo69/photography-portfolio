'use client';

import { motion, useScroll, useTransform } from "framer-motion";

export default function MultiLayerParallax() {
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div className="w-full h-screen overflow-hidden relative grid place-items-center" >
      <motion.h1
        style={{ 
            y: textY,
            opacity: opacity
         }}
        className="font-bold text-white text-3xl md:text-7xl 2xl:text-9xl relative z-10"
      >
        SNAPS BY MADZ
      </motion.h1>

      <motion.div
        className="absolute inset-0 z-0 from-black bg-linear-to-t"
        style={{
          backgroundImage: `url(/img/image-full.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/img/image-bottom.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
    </div>
  );
}