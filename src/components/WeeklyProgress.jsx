import React from "react";
import { motion } from "framer-motion";

export default function WeeklyProgress({ history }) {
  // Generate last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i)); // Go back 6 days to today
    return {
      dateString: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0), // M, T, W...
    };
  });

  return (
    <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        Last 7 Days Activity
      </h3>
      <div className="flex justify-between items-end h-16">
        {days.map((day, index) => {
          const isActive = history.includes(day.dateString);
          return (
            <div
              key={day.dateString}
              className="flex flex-col items-center gap-2 w-full"
            >
              {/* The Bar */}
              <div className="w-2 h-full bg-slate-600 rounded-full relative overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isActive ? "100%" : "0%" }}
                  className="absolute bottom-0 w-full bg-green-400 rounded-full"
                />
              </div>
              {/* The Label (M, T, W) */}
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              >
                {day.dayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
