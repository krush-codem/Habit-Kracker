import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import HabitItem from "./HabitItem";

export default function HabitList({ habits, onToggle, onDelete, onReset }) {
  return (
    // CHANGED: Removed max-h-[400px], added flex-1 and min-h-0
    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
      <AnimatePresence mode="popLayout">
        {habits.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-slate-500 mt-10"
          >
            No active quests. Add one above!
          </motion.p>
        )}

        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
            onReset={onReset}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
