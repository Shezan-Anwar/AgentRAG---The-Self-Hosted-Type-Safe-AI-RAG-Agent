import React, { useEffect, useRef } from 'react';
import type { Message } from '../types/Chat';

interface ChatWindowProps {
  messages: Message[];
  isGenerating : boolean;
}

export const ChatWindow = ({ messages , isGenerating }: ChatWindowProps) => {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages,isGenerating]);

  return (
    <div className="flex-1 w-full max-h-[400px] overflow-y-auto p-4 space-y-4 bg-zinc-900/40 rounded-xl border border-zinc-800/60 scrollbar-thin scrollbar-thumb-zinc-800 flex flex-col justify-start">
      {messages.length === 0 ? (
        <div className="h-full my-auto flex flex-col items-center justify-center text-center p-6 space-y-2">
          <span className="text-2xl text-blue-500 animate-pulse">🤖</span>
          <p className="text-sm text-zinc-400 font-medium">Context Vector Pipeline Active</p>
          <p className="text-xs text-zinc-600 max-w-xs">Ask anything. The agent will read your uploaded text file to formulate answers.</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10'
                  : 'bg-zinc-800 border border-zinc-700/50 text-zinc-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="text-[10px] text-zinc-600 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))
      )}
      
      {isGenerating && (
        <div className="mr-auto items-start flex flex-col max-w-[80%]">
          <div className="px-4 py-2.5 rounded-2xl text-sm bg-zinc-800/60 border border-zinc-700/30 text-zinc-400 rounded-tl-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-xs italic tracking-wide animate-pulse">Agent is thinking...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;