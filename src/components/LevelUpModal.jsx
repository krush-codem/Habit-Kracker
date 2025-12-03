// src/components/LevelUpModal.jsx - Template 1: Neon Gamer
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import confetti from "canvas-confetti";

export default function LevelUpModal({ show, level }) {
  // Trigger Confetti when 'show' becomes true
  useEffect(() => {
    if (show) {
      // 1. Center explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });

      // 2. Side cannons (slightly delayed)
      setTimeout(() => {
        confetti({
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 9999,
        });
        confetti({
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          zIndex: 9999,
        });
      }, 200);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{
              scale: 1,
              y: 0,
              transition: { type: "spring", bounce: 0.5 },
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-slate-900 p-8 rounded-3xl text-center border-4 border-transparent bg-clip-padding"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #0f172a, #1e293b), linear-gradient(to bottom right, #6366f1, #a855f7)",
              backgroundOrigin: "border-box",
            }}
          >
            {/* Glowing orbital effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse"></div>

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-yellow-400 flex justify-center mb-4"
              >
                <Trophy
                  size={64}
                  className="drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                />
              </motion.div>
              <h2 className="text-5xl font-black uppercase tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                Level Up!
              </h2>
              <p className="text-2xl font-bold text-white">
                You reached{" "}
                <span className="text-yellow-400">Level {level}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// "Cosmic Float" Template
// // src/components/LevelUpModal.jsx - Template 6: Cosmic Float
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Rocket } from 'lucide-react';

// export default function LevelUpModal({ show, level }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center z-50 bg-[#020617]/80 backdrop-blur-sm"
//         >
//           <div className="relative">
//             {/* Rotating Ring */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//               className="absolute -inset-8 rounded-full border-t-2 border-l-2 border-cyan-500/30 blur-sm"
//             ></motion.div>
//              <motion.div
//               animate={{ rotate: -360 }}
//               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//               className="absolute -inset-12 rounded-full border-b-2 border-r-2 border-purple-500/20 blur-sm"
//             ></motion.div>

//             <motion.div
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.5, opacity: 0 }}
//               transition={{ type: "spring", bounce: 0.4 }}
//               className="bg-slate-900/90 p-10 rounded-full text-center border border-slate-700 shadow-[0_0_50px_rgba(34,211,238,0.2)] w-64 h-64 flex flex-col items-center justify-center relative z-10"
//             >
//               <motion.div
//                 animate={{ y: [-5, 5, -5] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                 className="mb-2"
//               >
//                 <Rocket size={40} className="text-cyan-400" />
//               </motion.div>

//               <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-1">
//                 Ascension
//               </h2>

//               <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-purple-500">
//                 {level}
//               </div>

//               <p className="text-xs text-slate-500 mt-2 font-mono">
//                 ORBIT REACHED
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// "Fantasy RPG" Template
// src/components/LevelUpModal.jsx - Template 4: Fantasy RPG
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Scroll, Star } from 'lucide-react';

// export default function LevelUpModal({ show, level }) {
//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
//         >
//           <motion.div
//             initial={{ scaleY: 0, opacity: 0 }}
//             animate={{ scaleY: 1, opacity: 1 }}
//             exit={{ scaleY: 0, opacity: 0 }}
//             transition={{ duration: 0.5, ease: "circOut" }}
//             className="relative bg-[#fdf6e3] text-amber-900 p-10 rounded-lg max-w-sm w-full text-center border-double border-4 border-amber-700 shadow-[0_0_50px_rgba(217,119,6,0.5)]"
//           >
//             {/* Corner Decorations */}
//             <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-900" />
//             <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-900" />
//             <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-900" />
//             <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-900" />

//             <div className="flex justify-center mb-4 text-amber-600">
//               <Scroll size={48} strokeWidth={1.5} />
//             </div>

//             <h2 className="text-3xl font-serif font-bold uppercase tracking-widest mb-2 text-amber-800">
//               Quest Complete
//             </h2>
//             <div className="h-px w-32 bg-amber-900/30 mx-auto mb-4" />

//             <p className="font-serif text-lg italic text-amber-800/80 mb-2">
//               Thy power increases!
//             </p>

//             <div className="flex items-center justify-center gap-2 text-4xl font-serif font-black text-amber-600 mt-2">
//               <Star className="fill-amber-400 text-amber-600" size={28} />
//               <span>Level {level}</span>
//               <Star className="fill-amber-400 text-amber-600" size={28} />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
