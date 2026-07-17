import React from 'react'
import Navbar from './Navbar'
import ItemContainer from './ItemContainer'

const Background = () => {
  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 '>
      <Navbar />
      <ItemContainer/>
      
    </div>
  )
}

export default Background
