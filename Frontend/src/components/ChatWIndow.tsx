import React from 'react';
import type { Message } from '../types/Chat';

interface ChatWindowProps {
  messages: Message[];
}

export const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    /* 
      Changed max-h-[400px] to h-[400px] (or min-h-[400px]) so it occupies 
      the exact same real estate as the UploadBox component did.
    */
    <div className="flex-1 w-full h-[400px] overflow-y-auto p-4 space-y-4 bg-zinc-900/40 rounded-xl border border-zinc-800/60 scrollbar-thin scrollbar-thumb-zinc-800">
      
      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
          <span className="text-2xl text-zinc-600">💬</span>
          <p className="text-sm text-zinc-500 font-medium">No queries processed yet.</p>
          <p className="text-xs text-zinc-600 max-w-xs">Start typing your queries below.</p>
        </div>
      ) : (
        // Message Loop
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {/* Bubble */}
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10'
                  : 'bg-zinc-800 border border-zinc-700/50 text-zinc-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            
            {/* Timestamp */}
            <span className="text-[10px] text-zinc-600 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatWindow;