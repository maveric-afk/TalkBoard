import { useState } from "react"
import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"


export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = () => {
    if (roomCode.trim()) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setRoomCode("")
      }, 1500)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">

            <NavLink
              to='/rooms'
              className="py-2 px-4 absolute top-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
                  Back
              </NavLink>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
        
        {/* Heading */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12">
          Join a Room
        </motion.h1>

        {/* Card Container */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

          {/* Input Field */}
          <motion.div variants={itemVariants} className="mb-6">
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleJoin()}
              className="w-full px-4 py-3 md:py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
            />
          </motion.div>

          {/* Join Button */}
          <motion.button
            variants={buttonHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={handleJoin}
            disabled={isLoading || !roomCode.trim()}
            className="w-full py-3 md:py-4 font-semibold text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-900 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Joining...
              </span>
            ) : (
              "Join Room"
            )}
          </motion.button>

          {/* Helper Text */}
          <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
            Enter the room code provided by your host to join
          </motion.p>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center text-blue-200"
        >
          <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 8 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
