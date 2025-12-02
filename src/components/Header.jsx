import React from "react";
import { motion } from "framer-motion";
import { Trophy, Flame } from "lucide-react";

export default function Header({ userStats, progress }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
      <div className="flex justify-between items-center mb-4">
        {/* Level Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Trophy size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Level {userStats.level}</h1>
            <p className="text-xs text-indigo-100 opacity-80">Keep grinding!</p>
          </div>
        </div>

        {/* XP Info */}
        <div className="flex items-center gap-1 text-yellow-300 font-bold">
          <Flame size={20} />
          <span>{userStats.xp} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
      <p className="text-right text-xs mt-1 text-indigo-100">
        {progress.toFixed(0)}% to next level
      </p>
    </div>
  );
}
