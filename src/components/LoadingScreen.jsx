import React from "react";
import { motion } from "framer-motion";
import { Trophy, Zap, Gamepad2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
      {/* 1. Animated Logo Container */}
      <div className="relative mb-8">
        {/* Glowing background blob */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-indigo-500 blur-2xl rounded-full"
        />

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-2xl"
        >
          <Trophy size={48} className="text-yellow-400" />
        </motion.div>

        {/* Orbiting particles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute -top-4 -right-4">
            <Zap size={20} className="text-indigo-400 fill-indigo-400" />
          </div>
        </motion.div>
      </div>

      {/* 2. Loading Text */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-2"
      >
        System Initializing
      </motion.h2>

      <p className="text-slate-400 text-xs font-mono mb-6">
        Fetching player stats...
      </p>

      {/* 3. The Progress Bar */}
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Shine effect passing through bar */}
        <motion.div
          className="absolute top-0 bottom-0 w-20 bg-white/20 skew-x-12"
          initial={{ x: -100 }}
          animate={{ x: 300 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </div>
    </div>
  );
}
