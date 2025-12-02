import React from "react";
import { motion } from "framer-motion";
import { Check, Trash2, Zap, RotateCcw } from "lucide-react"; // Import RotateCcw
import { CATEGORIES } from "../utils/constants";

export default function HabitItem({ habit, onToggle, onDelete, onReset }) {
  const catStyle = CATEGORIES[habit.category] || CATEGORIES.office;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`relative p-3 rounded-xl border transition-all ${
        habit.completed
          ? "bg-slate-800/50 border-slate-700 opacity-75"
          : "bg-slate-700 border-slate-600"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        {/* Badge & XP */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${catStyle.color}`}
          >
            {catStyle.label}
          </span>
          <span className="text-[10px] text-yellow-400 font-mono flex items-center gap-1">
            <Zap size={10} /> {habit.xpValue} XP
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          {/* REPEAT BUTTON (Only shows when completed) */}
          {habit.completed && (
            <button
              onClick={() => onReset(habit.id)}
              className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800 px-2 py-1 rounded-md border border-slate-700 hover:border-blue-500/50"
              title="Respawn Task (Do it again)"
            >
              <RotateCcw size={12} />
              Again?
            </button>
          )}

          <button
            onClick={() => onDelete(habit.id)}
            className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
            habit.completed
              ? `bg-green-500 border-green-500`
              : `border-slate-400 hover:${catStyle.border}`
          }`}
        >
          {habit.completed && <Check size={14} className="text-white" />}
        </button>
        <span
          className={`text-sm ${
            habit.completed ? "line-through text-slate-500" : "text-white"
          }`}
        >
          {habit.text}
        </span>
      </div>
    </motion.div>
  );
}
