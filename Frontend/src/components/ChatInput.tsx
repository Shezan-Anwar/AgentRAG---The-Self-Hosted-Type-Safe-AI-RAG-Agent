import React from 'react'
import { useState } from 'react';
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
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={input} 
        onChange={(e)=>setInput(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Generating context answer.... please wait!":"Ask your queries...."}
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"

        />
        <button type='submit'>
            Send
        </button>
      </form>
    </div>
  )
}

export default ChatInput
