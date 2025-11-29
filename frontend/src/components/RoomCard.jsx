import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export const RoomCard = ({ image, name, type,members}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5,delay:0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-blue-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{name}</h3>
          <span className="text-white font-semibold">Active: <span>{members.length}</span></span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              type === "Private"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {type}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-blue-50 transition"
        >
          <UserPlus size={18} />
          Join
        </motion.button>
      </div>
    </motion.div>
  );
};
