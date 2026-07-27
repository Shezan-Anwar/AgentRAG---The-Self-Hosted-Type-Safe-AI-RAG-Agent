import React from 'react';
import { FcOpenedFolder } from "react-icons/fc";

interface AddedFileProps {
  fileNames: string[];
}

const AddedFile: React.FC<AddedFileProps> = ({ fileNames }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 max-h-[100px] overflow-y-auto p-1">
      {fileNames.map((name, index) => (
        <div 
          key={index} 
          className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800/90 border border-zinc-700/60 rounded-lg text-xs text-zinc-200 shadow-sm"
        >
          <span className="text-sm"><FcOpenedFolder /></span>
          <span className="font-medium truncate max-w-[150px]">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AddedFile;