import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600 mx-auto mb-6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </motion.svg>
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">
          404
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-2xl md:text-3xl font-semibold text-red-500 mb-6">
            Oops! Page Not Found
          </p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <motion.button
            onClick={() => navigate("/", { replace: true })}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            animate={{
              x: 0,
              opacity: 1,
              background: [
                "rgb(220, 38, 38)",
                "rgb(239, 68, 68)",
                "rgb(220, 38, 38)",
              ],
            }}
            transition={{
              duration: 2,
              background: {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <span className="relative z-10">Back to Home</span>
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
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
