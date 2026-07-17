import React from 'react'

const BackgroundGlow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 🔮 Glow Dot 1: Top Center Blue Bloom */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/15 blur-[120px]" />

      {/* 🌌 Glow Dot 2: Subtle Deep Indigo/Purple Offset Bloom */}
      <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
    </div>
  )
}

export default BackgroundGlow