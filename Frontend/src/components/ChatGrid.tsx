import React from 'react'
import ChatInput from './ChatInput'
import { useState } from 'react';
import ChatWindow from './ChatWIndow';
import type { Message } from '../types/Chat';


const ChatGrid = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSendMessage = (text: string) => {
    // 2. Safeguard against empty updates
    if (!text.trim()) return;

    // 3. Create a structured user message matching our contract
    const userMessage: Message = {
      id: crypto.randomUUID(), // Generates a safe, unique key string
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 4. Append it to the UI history log feed instantly
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsGenerating(true);

    // 5. Mocking the API search turnaround loop for now
    setTimeout(() => {
      const agentMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'agent',
        text: `Received: "${text}". Vector context validation pipeline initialized successfully.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prevMessages) => [...prevMessages, agentMessage]);
      setIsGenerating(false);
    }, 1500);
  };
  return (
    <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-2 backdrop-blur-md flex flex-col ">
        <ChatWindow messages={messages}/>
        <ChatInput onSend={handleSendMessage} disabled={isGenerating}/>

    </div>
  )
}

export default ChatGrid
