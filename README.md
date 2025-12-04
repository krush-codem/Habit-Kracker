# 🚀 Level Up: Gamified Habit Kracker
![Project Banner](https://ibb.co/NdM7gPv3)
## 📖 Introduction
**Level Up** is a productivity application that transforms daily tasks into an RPG-style game. Built to solve the problem of motivation, it uses immediate gratification (XP, Level Ups, Animations) to help users build consistency.

This project was engineered with a focus on **clean component architecture**, **performant state management**, and **responsive data visualization**.

🔗 **Live Demo:** [https://habit-kracker.vercel.app/]

---

## ✨ Key Features

### 🎮 Gamification Engine
* **XP & Leveling System:** Dynamic progress bars and level-up milestones.
* **Variable Rewards:** Different tasks yield different XP (e.g., *Learning* = 35XP, *Water* = 10XP).
* **"Respawn" Mechanic:** Unique feature allowing users to repeat completed tasks (grinding) without losing history.
* **Visual Feedback:** Confetti explosions and Framer Motion animations for user delight.

### 📊 Data & Analytics
* **Interactive Dashboard:** A scrolling activity log tracking every action.
* **Weekly Analysis:** Integrated **Recharts** to visualize consistency via Bar and Pie charts.
* **Timezone Intelligence:** Custom date parsing logic to ensure activity logs respect the user's local device time, preventing history syncing errors.

### ⚡ Technical Highlights
* **Persisted State:** Uses `localStorage` so users never lose progress on refresh.
* **Custom Hooks:** Logic separated into `useGamifiedHabits.js` for cleaner UI components.
* **Responsive Design:** Fully adaptive layout (Stacked on Mobile, Grid on Desktop).
* **Dark Mode UI:** Aesthetic "Gaming" theme using Tailwind CSS v4.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS v4 (Bleeding edge)
* **Animations:** Framer Motion, Canvas Confetti
* **Charts:** Recharts
* **Icons:** Lucide React

---

## 📂 Project Structure

This project follows a scalable folder structure separating Logic from View:

```bash
src/
├── components/        # UI Components (Pure rendering)
│   ├── Dashboard.jsx      # Activity Log
│   ├── WeeklyAnalysis.jsx # Recharts Visualization
│   ├── LevelUpModal.jsx   # Animation Logic
│   └── ...
├── hooks/             # Custom Hooks (Business Logic)
│   └── useGamifiedHabits.js  # State, LocalStorage, & XP Logic
├── utils/             # Constants & Helpers
│   └── constants.js       # Category definitions & Colors
├── App.jsx            # Layout Controller
└── main.jsx           # Entry Point
```

## 🚀 Getting Started
* To run this project locally:

* Clone the repository

```Bash

git clone https://github.com/krush-codem/habit-tracker.git
cd habit-tracker
Install Dependencies
```
```Bash

npm install
Run the Development Server
```
```Bash

npm run dev
Open in Browser Navigate to http://localhost:5173
```
## 🔮 Future Improvements
* Backend Integration: Move from LocalStorage to Firebase/Supabase for cross-device syncing.

* Social Features: Leaderboards to compete with friends.

* Questlines: Multi-day challenges (e.g., "7 Day Coding Streak").
