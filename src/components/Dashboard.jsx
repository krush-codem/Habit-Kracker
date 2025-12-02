import React, { useState } from "react"; // Import useState
import { BarChart3 } from "lucide-react"; // Import Icon
import { CATEGORIES } from "../utils/constants";
import WeeklyAnalysis from "./WeeklyAnalysis"; // Import new component

export default function Dashboard({ logs }) {
  const [showAnalysis, setShowAnalysis] = useState(false); // State for Modal

  // Group logs logic (Keep as is)
  const groupedLogs = logs.reduce((acc, log) => {
    const localDate = new Date(log.timestamp).toDateString();
    if (!acc[localDate]) acc[localDate] = [];
    acc[localDate].push(log);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 h-full flex flex-col">
        {/* Updated Header with Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            📊 Activity Log
          </h2>
          <button
            onClick={() => setShowAnalysis(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <BarChart3 size={14} />
            Review Week
          </button>
        </div>

        {/* List Content (Added custom-scrollbar & overflow here directly) */}
        <div className="overflow-y-auto custom-scrollbar flex-1 -mr-2 pr-2">
          {logs.length === 0 ? (
            <p className="text-slate-500 text-center text-sm mt-10">
              No history yet. Complete a task!
            </p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedLogs).map(([dateLabel, dayLogs]) => (
                <div key={dateLabel}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 sticky top-0 bg-slate-800 py-1 z-10">
                    {dateLabel}
                  </h3>
                  <div className="space-y-2">
                    {dayLogs.map((log) => {
                      const cat = CATEGORIES[log.category] || CATEGORIES.office;
                      return (
                        <div
                          key={log.logId}
                          className="flex justify-between items-center bg-slate-700/40 p-3 rounded-lg text-sm border border-slate-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${cat.color}`}
                            />
                            <span className="text-slate-200">
                              {log.habitName}
                            </span>
                          </div>
                          <span className="text-yellow-400 font-mono text-xs">
                            +{log.xp} XP
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render Modal if state is true */}
      {showAnalysis && (
        <WeeklyAnalysis logs={logs} onClose={() => setShowAnalysis(false)} />
      )}
    </>
  );
}
