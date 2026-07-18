import React from 'react'
import { CgEnter } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className='bg-zinc-900 h-17 vmax flex justify-between items-center px-5 '>
      <h1 className='text-white text-lg font-bold '>AgentRAG</h1>
      <button className='bg-white rounded-2xl  h-9 w-34 flex flex-wrap justify-center font-semibold items-center gap-2 text-sm text-black'><CgEnter/>Get Started</button>
      
    </div>

  )
}

export default Navbar
