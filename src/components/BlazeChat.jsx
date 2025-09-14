// src/components/BlazeChat.jsx
import { useState } from "react";
import { getBlazeResponse } from "../utils/blazeUtils";
import { styles } from "../style"; 

export default function BlazeChat() {
  const [messages, setMessages] = useState([
    { sender: "blaze", text: "Hi, I’m Blaze — Nishanth’s AI Assistant! ⚡" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const blazeReply = { sender: "blaze", text: getBlazeResponse(input) };

    setMessages([...messages, userMsg, blazeReply]);
    setInput("");
  };

  return (
    <div className="w-80 h-96 bg-primary shadow-lg rounded-xl flex flex-col border border-gray-600">
      {/* Header */}
      <div
  className="text-white p-3 rounded-t-xl font-bold flex items-center justify-between"
  style={{ backgroundColor: "#915EFF" }}
>
  Blaze ⚡
</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[85%] ${
              msg.sender === "user"
                ? "bg-gray-700 text-white ml-auto"
                : "bg-[#dfd9ff] text-black mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex border-t border-gray-700">
        <input
          className="flex-1 p-2 text-sm bg-transparent text-white outline-none placeholder-gray-400"
          type="text"
          value={input}
          placeholder="Ask Blaze..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
  onClick={handleSend}
  className="px-4 rounded-r-xl text-white"
  style={{ backgroundColor: "#915EFF" }}
>
  ➤
</button>

      </div>
    </div>
  );
}
