import { useState, useEffect } from "react";
import { CATEGORIES } from "../utils/constants"; // Make sure to import this at the top!

const XP_TO_LEVEL_UP = 100;

export function useGamifiedHabits() {
  // --- STATE ---
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem("userStats");
    const parsed = saved ? JSON.parse(saved) : {};

    // MERGE default values with saved values.
    // If 'logs' is missing in saved data, it uses the empty array []
    return {
      xp: 0,
      level: 1,
      logs: [],
      ...parsed,
    };
  });

  const [showLevelUp, setShowLevelUp] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("userStats", JSON.stringify(userStats));
  }, [habits, userStats]);

  // --- LOGIC ---
  const calculateProgress = () => {
    return ((userStats.xp % XP_TO_LEVEL_UP) / XP_TO_LEVEL_UP) * 100;
  };

  // Updated: Accepts XP and Category
  const addHabit = (text, category) => {
    const xpValue = CATEGORIES[category] ? CATEGORIES[category].xp : 10; // Fallback to 10 if error

    setHabits([
      ...habits,
      {
        id: Date.now(),
        text,
        completed: false,
        category,
        xpValue: xpValue, // Automatically set from constants
      },
    ]);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isCompleting = !habit.completed;

          if (isCompleting) {
            _gainXP(habit.xpValue);
            _addToLog(habit); // Log this action
          } else {
            _removeXP(habit.xpValue);
            _removeFromLog(habit.id); // Optional: Remove from log if unchecked
          }

          return { ...habit, completed: isCompleting };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // --- INTERNAL HELPERS ---
  const _addToLog = (habit) => {
    const newLog = {
      logId: Date.now(), // Unique ID for the log entry
      habitId: habit.id,
      habitName: habit.text,
      xp: habit.xpValue,
      category: habit.category,
      timestamp: new Date().toISOString(),
    };

    setUserStats((prev) => ({
      ...prev,
      logs: [newLog, ...prev.logs], // Add new log to top
    }));
  };

  // Fix: Remove ONLY the most recent entry for this habit, not all history
  const _removeFromLog = (habitId) => {
    setUserStats((prev) => {
      const newLogs = [...prev.logs]; // Create a copy of the array

      // Find the index of the FIRST log that matches this ID
      // Since new logs are added to the top, this is always the most recent one
      const indexToRemove = newLogs.findIndex((log) => log.habitId === habitId);

      if (indexToRemove !== -1) {
        newLogs.splice(indexToRemove, 1); // Remove exactly 1 item at that index
      }

      return {
        ...prev,
        logs: newLogs,
      };
    });
  };

  const _gainXP = (amount) => {
    setUserStats((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_TO_LEVEL_UP) + 1;

      if (newLevel > prev.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const _removeXP = (amount) => {
    setUserStats((prev) => {
      const newXP = Math.max(0, prev.xp - amount); // Prevent negative XP
      const newLevel = Math.floor(newXP / XP_TO_LEVEL_UP) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const resetHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: false } : habit
      )
    );
  };

  return {
    habits,
    userStats,
    showLevelUp,
    progress: calculateProgress(),
    addHabit,
    toggleHabit,
    deleteHabit,
    resetHabit,
  };
}
