import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import api from '../api/axios'
import {toast} from 'react-hot-toast'

export function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clicked,setClicked]=useState(false)
  const [userdata,setUserdata]=useState({})
  const [enteredotp,setEnteredOtp]=useState(null)
  const [actualotp,setActualOtp]=useState(null)
  const [emailverified,setEmailVerified]=useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const password = watch("password")
  const navigate=useNavigate()

  const onSubmit = async (data) => {
    setClicked(true);
    setUserdata(data);
    toast.success('Otp sent')
    api.post('/api/user/sendotp',data)
    .then((res)=>{
      if(res.data.otp){
        setActualOtp(res.data.otp)
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const verifyEmail=(e)=>{
    e.preventDefault();
    if(Number(enteredotp)===Number(actualotp)){
      setEmailVerified(true)
      api.post('/api/user/signup',userdata)
      .then((res)=>{
        if(res.data.success){
          toast.success(res.data.success)
          navigate('/signin');
        }
      })
    }
    else{
      return toast.error('Wrong otp')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.98 },
  }

  return (
    <div className="h-[100vh] flex justify-center py-8">

    <NavLink
        to='/'
        className="py-2 px-4 absolute top-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
            Back
        </NavLink>

      {clicked && !emailverified
      ?<div className="absolute shadow-black shadow z-50 p-16 rounded-md bg-white text-black">
        <p className="text-center text-lg sm:text-xl md:text-2xl font-bold mb-2">Otp Verification</p>
        <p className="text-gray-600 text-[8px] sm:text-[11px] md:text-sm mb-6">An otp is sent to your email {userdata.email}</p>

        <div className="flex flex-col gap-2">
        <label htmlFor="otp">Enter the otp</label>
        <input type="number"
        className="p-2 rounded-xs border"
        name="otp"
         value={enteredotp} 
        onChange={(e)=>setEnteredOtp(e.target.value)}  />
        <button type="submit"
        className="py-2 px-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200"
        onClick={verifyEmail}>Submit</button>
        </div>
      </div>
    :<div></div>}

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full max-w-md ${clicked?'blur-[5px]':''}`}
    >
      {/* Card Container */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join TalkBoard today</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Username</label>
            <input
              type="text"
              placeholder="Choose your username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.username && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1.5"
              >
                {errors.username.message}
              </motion.p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Email Address</label>
            <input
              type="email"
              onChange={(e)=>console.log(e.target.value)}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1.5"
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1.5"
              >
                {errors.password.message}
              </motion.p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1.5"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </motion.div>

          {/* Age Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Age</label>
            <input
              type="number"
              placeholder="What's Your Age ?"
              {...register("age", {
                required: "Please confirm your age",
              })}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.age && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1.5"
              >
                {errors.age.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Login Link */}
        <motion.div variants={itemVariants} className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/signin"
            className="text-blue-500font-semibold transition-colors"
          >
            Login
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  )
}

export default Signup
