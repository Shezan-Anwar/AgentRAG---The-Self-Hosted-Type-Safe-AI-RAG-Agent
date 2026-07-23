import React, { useRef, useState } from 'react';
import { IoCloudUploadSharp } from "react-icons/io5";

interface UploadBoxProps {
  onUploadSuccess: (title: string) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUploadSuccess }) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const [docTitle, setDocTitle] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log("Selected file:", file.name);

    
    const finalTitle = docTitle.trim() || file.name.split('.')[0];

    setIsUploading(true);
    setErrorMsg(null);
    const formData = new FormData();
    formData.append('file_name', finalTitle);
    formData.append('file', file);
    
      

      try {
      
        const response = await fetch('http://127.0.0.1:8000/ingest', {
          method: 'POST',
          
          body: formData,
        
        });

        if (!response.ok) {
          throw new Error('Vector ingestion process failed.');
        }
        onUploadSuccess(finalTitle);
      } catch (err: any) {
        console.error("Ingestion error:", err);
        setErrorMsg(err.message || 'Pipeline upload failed. Is your backend online?');
        setIsUploading(false);
      }
    };


  const handleButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-lg p-6 text-zinc-100 transition-all min-h-[100px]">

      <input 
        type="file"
        accept=".pdf,.txt" 
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