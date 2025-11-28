import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {io} from 'socket.io-client'
import { Cloud, Upload, ImageIcon, Hash, Type, Lock, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";
import api from "../api/axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CreateRoom() {
const[user,setUser]=useState({});
const[token,setToken]=useState('');
const [roomcreated,setRoomCreated]=useState(false);

  const form = useForm({
    defaultValues: {
      roomName: "",
      roomCode: "",
      roomType: "private",
      thumbnail: null,
    },
  });

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setValue("roomCode", code);
  };

  useEffect(()=>{
  api.get('/api/user')
  .then((res)=>{
    if(res.data.user){
      setUser(res.data.user);
    }
    if(res.data.token){
      setToken(res.data.token);
    }
  })
  .catch((e)=>{
    console.log(e)
  })
  },[])

  const onSubmit = async (data) => {
   
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 md:p-6">

             <NavLink
              to='/rooms'
              className="py-2 px-4 absolute top-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
                  Back
              </NavLink>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
        
        {/* Heading */}
        <motion.div variants={headingVariants} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Create a Room
          </h1>
          <p className="text-blue-500 mt-2">Set up your perfect chatroom space</p>
        </motion.div>

        {/* Card */}
        <motion.div variants={itemVariants} className="bg-white shadow-lg rounded-2xl p-8 w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">

            {/* Thumbnail Upload */}
            <motion.div variants={itemVariants}>
              <label className="text-blue-900 font-semibold">Room Thumbnail</label>

              <div className="relative mt-3">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="thumbnail-input"
                />

                <label htmlFor="thumbnail-input" className="block cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 overflow-hidden group relative"
                  >
                
                      <div className="flex justify-center mb-3 relative z-10">
                        <Cloud className="w-12 h-12 text-blue-500" />
                      </div>
                    

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  </motion.div>
                </label>
              </div>
            </motion.div>

            {/* Room Name */}
            <motion.div variants={itemVariants}>
              <label className="text-blue-900 font-semibold">Room Name</label>
              <div className="relative mt-1">
                <Type className="absolute left-3 top-3 text-blue-400" size={18} />
                <input
                  {...form.register("roomName")}
                  placeholder="Enter room name"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-blue-200 bg-white text-blue-900 
                  placeholder:text-blue-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Room Code */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-blue-900 font-semibold">Room Code</label>

                <motion.button
                  type="button"
                  onClick={generateRoomCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Generate
                </motion.button>
              </div>

              <div className="relative mt-1">
                <Hash className="absolute left-3 top-3 text-blue-400" size={18} />
                <input
                  {...form.register("roomCode")}
                  placeholder="Auto-generated or enter code"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-blue-200 bg-blue-50 
                  text-blue-900 placeholder:text-blue-300 focus:outline-none focus:border-blue-500 font-mono transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Room Type */}
            <motion.div variants={itemVariants}>
              <label className="text-blue-900 font-semibold block mb-3">Room Type</label>

              <div className="flex gap-3 flex-col sm:flex-row">
                {[
                  { type: "private", icon: <Lock size={18} /> },
                  { type: "public", icon: <Globe size={18} /> },
                ].map((opt) => (
                  <motion.label
                    key={opt.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 cursor-pointer w-full transition-all duration-300 ${
                      form.watch("roomType") === opt.type
                        ? "border-blue-500 bg-blue-50"
                        : "border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt.type}
                      checked={form.watch("roomType") === opt.type}
                      onChange={() => form.setValue("roomType", opt.type)}
                      className="hidden"
                    />
                    {opt.icon}
                    <span className="text-blue-900 font-semibold capitalize">{opt.type}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Create Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-950 
                text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                Create Room
              </motion.button>
            </motion.div>

          </form>
        </motion.div>

      </motion.div>
    </div>
  );
}
