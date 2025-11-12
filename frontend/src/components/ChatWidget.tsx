// src/components/ChatWidget.tsx
import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../services/aiService";
import type { ChatMessage } from "../services/aiService";

const ChatWidget = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2),
      sender: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    try {
      const aiResponse = await sendChatMessage(input);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(36).substring(2), sender: "ai", content: `⚠️ ${error.message}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-80 bg-gray-800 text-white rounded shadow-lg flex flex-col z-50">
      {/* Messages */}
      <div className="p-2 flex-1 overflow-y-auto max-h-96 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded break-words ${
              msg.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="p-2 rounded bg-gray-700 self-start italic text-gray-300">
            AI is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex space-x-2 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-2 py-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
