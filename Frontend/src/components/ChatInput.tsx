import { useRef } from 'react';
import { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { IoDocumentAttachSharp } from "react-icons/io5";
interface ChatInputProp {
    onSend : (text: string)=>void;
    onUploadSuccess: (newTitles: string[]) => void;
    disabled : boolean;
}


const ChatInput = ({ onSend, onUploadSuccess, disabled }: ChatInputProp) => {
    const [input, setInput] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(input.trim() && !disabled && !isUploading){
            onSend(input);
            setInput('');
        }
    
};
const handleAttachClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };
const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {  
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    try {
      const response = await fetch('http://127.0.0.1:8000/ingest', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Mid-conversation vector ingestion failed.');
      }

      const data = await response.json();

      let uploadedTitles: string[] = [];
      if (data.documents && data.documents.length > 0) {
        uploadedTitles = data.documents.map((doc: { title: string }) => doc.title);
      } else {
        uploadedTitles = Array.from(files).map((f) => f.name.split('.')[0]);
      }
      onUploadSuccess(uploadedTitles);
    } catch (err) {
      console.error("Attachment error:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
    }
  };
  return (
    <div className=" width-full pt-1 flex gap-3">
      <input 
        type="file" 
        accept=".pdf,.txt" 
        multiple 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <button 
      type="button"
      onClick={handleAttachClick}
      disabled={isUploading}
      title="Attach additional document"
      className='items-center bg-blue-800 hover:bg-blue-600 disabled:bg-zinc-800 border border-transparent text-white font-medium px-5 rounded-lg transition-all active:scale-[0.98] '>
        <IoDocumentAttachSharp />
      </button>
    
      <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
        
        <input 
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "No context found , please upload the context file ..." : "Ask your queries...."}
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
