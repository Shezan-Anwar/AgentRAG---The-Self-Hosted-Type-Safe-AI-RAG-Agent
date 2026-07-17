import React from 'react'
import ChatInput from './ChatInput'
import { useState } from 'react';


const ChatGrid = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSendMessage = () => {
    setIsGenerating(true); 
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };
  return (
    <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-2 backdrop-blur-md">
        <div className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Execution Sandbox
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isGenerating}/>

    </div>
  )
}

export default ChatGrid
