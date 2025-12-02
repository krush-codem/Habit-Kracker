import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LevelUpModal({ show, level }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-yellow-400 text-slate-900 p-8 rounded-3xl shadow-2xl text-center transform rotate-3 border-4 border-white">
            <h2 className="text-4xl font-black uppercase tracking-wider mb-2">
              Level Up!
            </h2>
            <p className="text-xl font-bold">You reached Level {level}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
