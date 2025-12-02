import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { X, Trophy, Target, Zap } from "lucide-react";
import { CATEGORIES } from "../utils/constants";

export default function WeeklyAnalysis({ logs, onClose }) {
  // --- DATA PROCESSING HELPERS ---

  // 1. Filter logs to last 7 days only
  const last7Days = logs.filter((log) => {
    const logDate = new Date(log.timestamp);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return logDate >= sevenDaysAgo;
  });

  // 2. Prepare Data for Bar Chart (XP per Day)
  const daysMap = {};
  // Initialize last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toDateString();
    daysMap[dateKey] = {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      xp: 0,
    };
  }
  // Fill with real data
  last7Days.forEach((log) => {
    const dateKey = new Date(log.timestamp).toDateString();
    if (daysMap[dateKey]) {
      daysMap[dateKey].xp += log.xp;
    }
  });
  const barData = Object.values(daysMap);

  // 3. Prepare Data for Pie Chart (Category Split)
  const catMap = {};
  last7Days.forEach((log) => {
    if (!catMap[log.category]) catMap[log.category] = 0;
    catMap[log.category] += 1;
  });

  const pieData = Object.keys(catMap).map((catKey) => ({
    name: CATEGORIES[catKey]?.label || catKey,
    value: catMap[catKey],
    color: CATEGORIES[catKey]?.color.replace("bg-", "var(--color-"), // This is a trick, or we can hardcode hex codes
  }));

  // Hardcoding Hex codes for the chart because Recharts needs real colors, not Tailwind classes
  const COLORS = {
    office: "#3b82f6", // blue-500
    learning: "#eab308", // yellow-500
    health: "#ef4444", // red-500
    personal: "#a855f7", // purple-500
    fitness: "#22c55e", // green-500
  };

  // 4. Calculate Top Stats
  const totalXP = last7Days.reduce((sum, log) => sum + log.xp, 0);
  const totalTasks = last7Days.length;
  const topCategoryEntry = Object.entries(catMap).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const topCategory = topCategoryEntry
    ? CATEGORIES[topCategoryEntry[0]]?.label
    : "None";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 shadow-2xl relative custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur z-10 p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Weekly Review</h2>
            <p className="text-slate-400 text-sm">
              Your performance over the last 7 days
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* 1. Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Total XP
                </p>
                <p className="text-2xl font-bold text-white">{totalXP}</p>
              </div>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                <Target size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Tasks Crushed
                </p>
                <p className="text-2xl font-bold text-white">{totalTasks}</p>
              </div>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4">
              <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400">
                <Trophy size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Top Vibe
                </p>
                <p className="text-2xl font-bold text-white">{topCategory}</p>
              </div>
            </div>
          </div>

          {/* 2. Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-lg font-bold mb-6 text-slate-200">
                Daily Consistency (XP)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis
                      dataKey="day"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderColor: "#334155",
                        color: "white",
                      }}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Bar dataKey="xp" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-lg font-bold mb-6 text-slate-200">
                Focus Areas
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => {
                        // Find original key to get color
                        const key = Object.keys(catMap)[index];
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[key] || "#94a3b8"}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderColor: "#334155",
                        borderRadius: "8px",
                        color: "white",
                      }}
                      itemStyle={{
                        color: "#ffffff",
                      }} /* Ensures the value text is also white */
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
