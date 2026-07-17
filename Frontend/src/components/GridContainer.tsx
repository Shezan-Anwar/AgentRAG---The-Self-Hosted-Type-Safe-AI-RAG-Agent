import React from 'react'
import Card from './Card'

const GridContainer = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default GridContainer
