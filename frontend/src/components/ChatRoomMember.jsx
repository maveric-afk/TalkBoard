import React from "react";
import { motion } from "framer-motion";


export default function ChatRoomMember({ members }) {

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      <div className="sticky top-0 bg-blue-50 border-b border-blue-200 px-4 py-4">
        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Team Members</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Online Members */}
        {members.length > 0 && (
          <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-blue-600 uppercase mb-2 px-2">
              Online ({members.length})
            </h3>
            <div className="space-y-1">
              {members.map((member) => (
                <MemberItem key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function MemberItem({ member }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer group"
    >
      <div className="relative flex-shrink-0">
        <img
          src={member.avatar || "/placeholder.svg"}
          alt={member.name}
          className="w-8 h-8 rounded-full object-cover shadow-sm"
        />
      
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-blue-900 truncate group-hover:text-blue-600 transition-colors">
          {member.name}
        </p>
      </div>
    </motion.div>
  );
}
