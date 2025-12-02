// src/components/LevelUpModal.jsx - Template 1: Neon Gamer
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

export default function LevelUpModal({ show, level }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{
              scale: 1,
              y: 0,
              transition: { type: "spring", bounce: 0.5 },
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-slate-900 p-8 rounded-3xl text-center border-4 border-transparent bg-clip-padding"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #0f172a, #1e293b), linear-gradient(to bottom right, #6366f1, #a855f7)",
              backgroundOrigin: "border-box",
            }}
          >
            {/* Glowing orbital effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse"></div>

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-yellow-400 flex justify-center mb-4"
              >
                <Trophy
                  size={64}
                  className="drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                />
              </motion.div>
              <h2 className="text-5xl font-black uppercase tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                Level Up!
              </h2>
              <p className="text-2xl font-bold text-white">
                You reached{" "}
                <span className="text-yellow-400">Level {level}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
