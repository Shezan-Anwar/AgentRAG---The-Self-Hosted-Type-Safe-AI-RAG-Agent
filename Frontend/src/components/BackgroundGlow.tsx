import React from 'react'

const BackgroundGlow = () => {
  return (
    // We use z-[-1] to force the entire background system behind the main content
    <div className="absolute inset-0 overflow pointer-events-none z-0">
      
      {/* 🔮 Glow Dot 1: Top Center Blue Bloom */}
      <div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/15" 
        style={{ filter: 'blur(120px)' }}
      />
      
      {/* 🌌 Glow Dot 2: Subtle Deep Indigo/Purple Offset Bloom */}
      <div 
        className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] rounded-full bg-indigo-600/10" 
        style={{ filter: 'blur(100px)' }}
      />

    </div>
  )
}

export default BackgroundGlow