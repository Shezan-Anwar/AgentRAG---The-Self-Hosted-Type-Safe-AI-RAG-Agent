import React from 'react'
import { motion } from "framer-motion"

const BackgroundGlow = () => {
  return (
    // We use z-[-1] to force the entire background system behind the main content
    <div className="absolute inset-0 overflow pointer-events-none z-0">
      
      {/* 🔮 Glow Dot 1: Top Center Blue Bloom */}
      <motion.div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-blue-500/50" 
        style={{ filter: 'blur(120px)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.3, 0.18],
          x: [0, 15, -15, 0],
          y: [0, -10, 10, 0],
        }}
         transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 🌌 Glow Dot 2: Subtle Deep Indigo/Purple Offset Bloom */}
      <motion.div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-500/50" 
        style={{ filter: 'blur(100px)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, -20, 10, 0],
          y: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  )
}

export default BackgroundGlow