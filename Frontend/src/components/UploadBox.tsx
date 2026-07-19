import React, { useRef } from 'react';
import { IoCloudUploadSharp } from "react-icons/io5";

// 1. Define the TypeScript interface for the props
interface UploadBoxProps {
  onUploadSuccess: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUploadSuccess }) => {
  // 2. Use a ref to trigger the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log("Selected file:", file.name);

    // TODO: Add your backend upload/processing logic here
    // e.g., const formData = new FormData(); formData.append('file', file);

    // 3. Trigger the layout switch once the file is ready
    onUploadSuccess();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-lg p-6 text-zinc-100 transition-all min-h-[100px]">
      {/* Hidden native input */}
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
            className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors focus:outline-none text-7xl"
          >
            <IoCloudUploadSharp />
          </button>
        
        <div>
         
          <span className="text-zinc-400">Upload a document</span>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;