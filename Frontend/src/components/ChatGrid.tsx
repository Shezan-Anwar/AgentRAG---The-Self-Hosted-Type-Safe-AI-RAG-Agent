import React, { useState } from 'react'
import ChatInput from './ChatInput'
import ChatWindow from './ChatWIndow';
import UploadBox from './UploadBox';
import type { Message } from '../types/Chat';

const ChatGrid = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState<boolean>(false);

  const handleUpload = (): void => {
    setIsDocumentUploaded(true);
  };

  // 🚀 1. Converted into an asynchronous execution scope to allow network requests
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsGenerating(true);

    try {
      
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: text // 
        }),
      });

      if (!response.ok) {
        throw new Error('Vector retrieval pipeline failed.');
      }

      const data = await response.json();

      const agentMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'agent',
        text: data.answer, // Ensure 'answer' matches what your Python dictionary returns
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prevMessages) => [...prevMessages, agentMessage]);

    } catch (error) {
      console.error("Query Error:", error);
      
      // Injecting a clear system feedback message if network layer drops
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'agent',
        text: "🚨 Pipeline error: Unable to pull vector nodes. Confirm your FastAPI local script runtime is active.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-2 backdrop-blur-md flex flex-col gap-2">
      {isDocumentUploaded ? (
        <ChatWindow isGenerating ={isGenerating} messages={messages} />
      ) : (
        <UploadBox onUploadSuccess={handleUpload} />
      )}
      
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isGenerating || !isDocumentUploaded} 
      />
    </div>
  );
};

export default ChatGrid;