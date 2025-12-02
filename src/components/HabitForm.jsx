import React, { useState } from "react";
import { Plus, Zap } from "lucide-react"; // Added Zap icon for visual feedback
import { CATEGORIES } from "../utils/constants";

export default function HabitForm({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("office"); // Default to first category

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category); // No longer sending XP
    setText("");
  };

  // Get current XP to show the user what they will earn
  const currentXP = CATEGORIES[category].xp;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600"
    >
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Habit name..."
          className="flex-1 bg-slate-900 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-2 items-center">
        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 border border-slate-600 focus:outline-none flex-1"
        >
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.label} (+{cat.xp} XP)
            </option>
          ))}
        </select>

        {/* Visual Indicator of Points */}
        <div className="bg-slate-800 px-3 py-2 rounded-lg border border-slate-600 flex items-center gap-1 text-yellow-400 text-xs font-bold font-mono">
          <Zap size={12} />
          {currentXP} XP
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>
    </form>
  );
}
