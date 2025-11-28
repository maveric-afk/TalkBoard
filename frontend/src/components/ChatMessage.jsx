import React from "react";

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ChatMessage({ message }) {
  const isCurrentUser = message.userId === "currentUser";

  return (
    <div className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <img
        src={message.userAvatar || "/placeholder.svg"}
        alt={message.userName}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm"
      />

      {/* Message Content */}
      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-blue-900">{message.userName}</span>
          <span className="text-xs text-blue-500">{formatTime(message.timestamp)}</span>
        </div>
        <div
          className={`px-4 py-2.5 rounded-2xl max-w-sm shadow-sm transition-all hover:shadow-md ${
            isCurrentUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-blue-50 text-blue-900 rounded-bl-none border border-blue-200"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
