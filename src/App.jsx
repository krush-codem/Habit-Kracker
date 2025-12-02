import React, { useState, useEffect } from "react";
import { useGamifiedHabits } from "./hooks/useGamifiedHabits";
import { AnimatePresence, motion } from "framer-motion"; // Import Framer Motion

// UI Components
import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import LevelUpModal from "./components/LevelUpModal";
import Dashboard from "./components/Dashboard";
import LoadingScreen from "./components/LoadingScreen"; // <-- Import the new component

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // 1. Add Loading State

  const {
    habits,
    userStats,
    showLevelUp,
    progress,
    addHabit,
    toggleHabit,
    deleteHabit,
    resetHabit,
  } = useGamifiedHabits();

  // 2. Create the "Fake" Load Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 3. Wrap everything in AnimatePresence for smooth exit */}
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -20 }} // Smoothly fades out and moves up
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen p-4 md:p-8 flex items-center justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-lg md:max-w-5xl">
              {/* LEFT COLUMN */}
              <div className="w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 h-[500px] md:h-[600px] flex flex-col order-1">
                <Header userStats={userStats} progress={progress} />
                <div className="p-4 md:p-6 flex flex-col flex-1 overflow-hidden">
                  <HabitForm onAdd={addHabit} />
                  <HabitList
                    habits={habits}
                    onToggle={toggleHabit}
                    onDelete={deleteHabit}
                    onReset={resetHabit}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-full h-[400px] md:h-[600px] order-2">
                <Dashboard logs={userStats.logs} />
              </div>
            </div>
            <LevelUpModal show={showLevelUp} level={userStats.level} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
