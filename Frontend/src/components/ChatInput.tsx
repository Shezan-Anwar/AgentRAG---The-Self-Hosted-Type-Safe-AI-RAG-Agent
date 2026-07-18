import React from 'react'
import { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
interface ChatInputProp {
    onSend : (text: string)=>void;
    disabled : boolean;
}


const ChatInput = ({onSend ,disabled}:ChatInputProp) => {
    const [input, setInput] = useState<string>('');


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(input.trim() && !disabled){
            onSend(input);
            setInput('');
        }
    
}
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
        
        <input 
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "Generating context answer.... please wait!" : "Ask your queries...."}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
        />
        
        <button 
          type="submit"
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-700 disabled:cursor-not-allowed border border-transparent text-white font-medium px-5 py-2.5 rounded-lg transition-all active:scale-[0.98]"
        >
          <IoSendSharp />
        </button>

      </form>
    </div>
  )
}

export default ChatInput
