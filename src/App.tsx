import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { useCategories } from "./features/Categories/useCategories";

function App() {
  const navigate = useNavigate();
  useCategories();

  // Create array of raindrop positions
  const raindrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 via-red-700 to-red-800 overflow-hidden relative">
      {/* Animated Rain Effect */}
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 h-10 bg-white/20 rounded-full"
          style={{ left: drop.left }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: "120vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Computer SVG */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 0,
            }}
            transition={{
              rotate: { duration: 0.8, delay: 0.2 },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </motion.svg>

          {/* CCTV Camera SVG */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            initial={{ scale: 0, rotate: 180 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 0,
            }}
            transition={{
              rotate: { duration: 0.8, delay: 0.4 },
              scale: { duration: 2, repeat: Infinity, delay: 0.3 },
            }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <circle cx="12" cy="12" r="3" />
            <line x1="20" y1="4" x2="23" y2="7" />
            <line x1="23" y1="7" x2="23" y2="11" />
          </motion.svg>

          {/* Laptop SVG */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 0,
            }}
            transition={{
              rotate: { duration: 0.8, delay: 0.6 },
              scale: { duration: 2, repeat: Infinity, delay: 0.6 },
            }}
          >
            <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16" />
          </motion.svg>

          {/* Pendrive SVG */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            initial={{ scale: 0, rotate: 180 }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 0,
            }}
            transition={{
              rotate: { duration: 0.8, delay: 0.8 },
              scale: { duration: 2, repeat: Infinity, delay: 0.9 },
            }}
          >
            <path d="M4 10v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
            <rect x="8" y="2" width="8" height="8" rx="1" />
          </motion.svg>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-5xl font-bold text-white text-shadow-lg"
        >
          Welcome to GS Admin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl text-gray-200"
        >
          Your one-stop solution for efficient administration
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden backdrop-blur-sm"
          >
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-50"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
