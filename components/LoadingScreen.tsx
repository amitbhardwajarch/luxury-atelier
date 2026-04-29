"use client";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const { progress, active } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center text-white"
        >
          <motion.h1 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-2xl font-serif tracking-[0.5em] uppercase mb-8"
          >
            Atelier
          </motion.h1>
          <div className="w-48 h-[1px] bg-white/20 relative">
            <motion.div 
              className="absolute h-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-[10px] tracking-widest uppercase opacity-50">
            Harmonizing Spaces {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}