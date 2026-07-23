import React from 'react'
import type { AddedFileProps } from '../types/Addedfile';
import { FcOpenedFolder } from "react-icons/fc";

const AddedFile : React.FC<AddedFileProps> = ({fileName}) => {
  return (
    <div className="flex items-center  gap-2 px-3 py-1.5 bg-zinc-800/80 border border-zinc-700/50 rounded-lg w-fit text-xs text-zinc-300">
      <span className=" animate-pulse" ><FcOpenedFolder /></span>
        <span className="text-gray font-semibold truncate max-w-[200px] animate-pulse">
         {fileName}
        </span>
    </div>
  )
}

export default AddedFile
