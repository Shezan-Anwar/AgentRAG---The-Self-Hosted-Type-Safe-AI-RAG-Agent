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

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsGenerating(true);

    // Mock API simulation
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
    <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-2 backdrop-blur-md flex flex-col gap-2">
      {isDocumentUploaded ? (
        <ChatWindow messages={messages} />
      ) : (
        <UploadBox onUploadSuccess={handleUpload} />
      )}
      
      {/* 
        The input should be disabled if the system is currently generating an answer 
        OR if the document has not been uploaded yet.
      */}
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isGenerating || !isDocumentUploaded} 
      />
    </div>
  );
};

export default ChatGrid;