import React from 'react'
import Navbar from './Navbar'
import ItemContainer from './ItemContainer'
import Footer from './Footer'

const Background = () => {
  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 '>
      <Navbar />
      <ItemContainer/>
      <Footer/>
      
    </div>
  )
}

export default Background
