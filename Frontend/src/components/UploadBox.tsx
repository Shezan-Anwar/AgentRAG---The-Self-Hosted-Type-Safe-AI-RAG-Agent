import React, { useRef, useState } from 'react';
import { IoCloudUploadSharp } from "react-icons/io5";

// 1. Define the TypeScript interface for the props
interface UploadBoxProps {
  onUploadSuccess: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUploadSuccess }) => {
  // 2. Use a ref to trigger the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Added states for tracking the document title text and managing network status
  const [docTitle, setDocTitle] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log("Selected file:", file.name);

    // Auto-fallback to filename if the text input was left blank
    const finalTitle = docTitle.trim() || file.name.split('.')[0];

    setIsUploading(true);
    setErrorMsg(null);

    // 🚀 Read the actual text content of the file directly inside the browser
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const textContent = e.target?.result as string;

      try {
        // 🚀 Dispatching a clean application/json payload matching your Pydantic IngestionRequest schema
        const response = await fetch('http://127.0.0.1:8000/ingest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file_name: finalTitle,
            text_content: textContent,
          }),
        });

        if (!response.ok) {
          throw new Error('Vector ingestion process failed.');
        }

        // 3. Trigger the layout switch once the file is ready
        onUploadSuccess();
      } catch (err: any) {
        console.error("Ingestion error:", err);
        setErrorMsg(err.message || 'Pipeline upload failed. Is your backend online?');
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setErrorMsg("Failed to read text file contents.");
      setIsUploading(false);
    };

    // Trigger the actual file reading action as plain text
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-lg p-6 text-zinc-100 transition-all min-h-[100px]">
      {/* Hidden native input - locked exclusively to .txt files */}
      <input 
        type="file"
        accept=".txt" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
      />

      {/* Stylized custom UI */}
      <div className="text-center space-y-3">
         <button 
            type="button"
            onClick={handleButtonClick}
            disabled={isUploading}
            className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors focus:outline-none text-7xl"
          >
            <IoCloudUploadSharp />
          </button>
        
        <div>
          <span className="text-zinc-400">
            {isUploading ? "Processing Vectors..." : "Upload a document"}
          </span>
        </div>
        <div>
          {/* Connected state variables to make this a controlled React input */}
          <input
            type='text'
            placeholder='Name of the doc'
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            disabled={isUploading}
            className='bg-zinc-400 rounded text-white p-1 text-lg'
          />
        </div>

        {/* Dynamic network issue feedback banner */}
        {errorMsg && (
          <div className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded p-1.5 mt-2">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBox;