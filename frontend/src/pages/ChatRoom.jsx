import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ChevronLeft, Menu, Send } from "lucide-react";
import ChatMessage from "../components/ChatMessage";
import ChatRoomMember from "../components/ChatRoomMember";


export default function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Chen",
      userAvatar: "/woman-profile-avatar.png",
      text: "Hey team! Just pushed the latest updates to the staging environment.",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: "2",
      userId: "user2",
      userName: "Alex Rodriguez",
      userAvatar: "/profile-avatar-man.png",
      text: "Great! Let me review the code changes right away.",
      timestamp: new Date(Date.now() - 3 * 60000),
    },
    {
      id: "3",
      userId: "user3",
      userName: "Jordan Taylor",
      userAvatar: "/profile-avatar-developer.jpg",
      text: "The performance metrics look promising. Response time is down by 23%.",
      timestamp: new Date(Date.now() - 1 * 60000),
    },
  ]);

  const [members, setMembers] = useState([
    {
      id: "user1",
      name: "Sarah Chen",
      avatar: "/woman-profile-avatar.png",
      status: "online",
    },
    {
      id: "user2",
      name: "Alex Rodriguez",
      avatar: "/profile-avatar-man.png",
      status: "online",
    },
    {
      id: "user3",
      name: "Jordan Taylor",
      avatar: "/profile-avatar-developer.jpg",
      status: "online",
    },
    {
      id: "user4",
      name: "Morgan Lee",
      avatar: "/profile-avatar-engineer.jpg",
      status: "away",
    },
    {
      id: "user5",
      name: "Casey Williams",
      avatar: "/profile-avatar-designer.jpg",
      status: "offline",
    },
  ]);

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    setIsTyping(true);

    const newMessage = {
      id: Date.now().toString(),
      userId: "currentUser",
      userName: "You",
      userAvatar: "/user-profile-avatar.png",
      text,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput("");
    }
  };

  const handleLeaveRoom = () => {
    console.log("Leaving room...");
  };

  const onlineMemberCount = members.filter((m) => m.status === "online").length;

  return (
    <div className="flex h-full bg-white">
      {/* Desktop Member List */}
      <div className="hidden md:flex md:w-64 bg-blue-50 border-r border-blue-200">
        <ChatRoomMember members={members} />
      </div>

      {/* Mobile Member List Drawer */}
      <AnimatePresence>
        {isMobile && isMemberListOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMemberListOpen(false)}
              className="fixed inset-0 z-40 bg-black/30"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-72 bg-blue-50 border-r border-blue-200 overflow-y-auto"
            >
              <div className="p-4">
                <button
                  onClick={() => setIsMemberListOpen(false)}
                  className="mb-4 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-900" />
                </button>
                <ChatRoomMember members={members} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200 bg-white">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={() => setIsMemberListOpen(!isMemberListOpen)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-blue-600" />
              </button>
            )}
            <img
              src="/tech-company-room-avatar.jpg"
              alt="Room"
              className="w-12 h-12 rounded-lg object-cover shadow-sm"
            />
            <div>
              <h1 className="text-xl font-semibold text-blue-900">Engineering Team</h1>
              <p className="text-sm text-blue-600">{onlineMemberCount} members online</p>
            </div>
          </div>

          <button
            onClick={handleLeaveRoom}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Leave</span>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  delay: index * 0.05,
                }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-end gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">Y</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-4 py-3 rounded-2xl rounded-bl-none">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-blue-400"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-blue-400"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-blue-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-blue-200 bg-white">
          <div
            className={`flex items-end gap-3 p-3 rounded-xl border-2 transition-all ${
              isFocused ? "border-blue-600 bg-blue-50 shadow-md" : "border-blue-200 bg-blue-50 shadow-sm"
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-blue-900 placeholder-blue-400 outline-none text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
