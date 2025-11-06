import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {User} from 'lucide-react'
import Lottie from 'lottie-react'
import HeroAnim from '../../Handshake Loop.json'
import Loading from '../../loading.json'
import { useState } from "react"
import { useEffect } from "react"

export default function Home() {
    const [loading,setLoading]=useState(true);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 3000);
  },[])

  return (
    <div>
        {loading
        ?<div className="w-full bg-white h-[100vh] flex justify-center items-center">
            <Lottie animationData={Loading} loop/>
        </div>
    :<div className="w-full bg-white">
        {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-5 py-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
              <img src={`/talkboard_logo.png`} alt="logo" className="h-[4rem] sm:h-[5rem] md:h-[7rem]"/>
              <span className="hidden sm:inline text-xl sm:text-2xl font-bold text-blue-400">TalkBoard</span>
            </motion.div>

            {/* Register Link */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
              >
                <User className="hover:text-blue-500 scale-105 duration-200"></User>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4">
          {/* Illustration */}
          <motion.div variants={imageVariants} className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <Lottie animationData={HeroAnim} loop/>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl">
            <p className="text-base sm:text-lg lg:text-xl text-blue-500 leading-relaxed text-pretty">
              Join TalkBoard to engage in meaningful discussions, share ideas with your community, and build lasting
              connections in real-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Action Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
          {/* Boards Button */}
          <motion.button
            variants={buttonVariants}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-blue-400 border border-blue-400 font-bold text-lg sm:text-xl rounded-full transition-all duration-200"
          >
            Explore Boards
          </motion.button>

          {/* Rooms Button */}
          <motion.button
            variants={buttonVariants}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-blue-700 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-blue-950 transition-all duration-200"
          >
            Find Rooms
          </motion.button>
        </div>
      </motion.div>
      </div>}  
    </div>
  )
}
