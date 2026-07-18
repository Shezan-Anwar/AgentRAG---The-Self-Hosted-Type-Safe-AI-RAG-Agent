import React from 'react'

const UploadBox = () => {
  return (
    <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all">
      <input 
      type='file'
      accept='.pdf,.txt'
      />
    </div>
  )
}

export default UploadBox
