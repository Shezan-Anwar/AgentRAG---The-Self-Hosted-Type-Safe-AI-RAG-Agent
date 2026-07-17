import React from 'react'
import CenterText from './CenterText'
import GridContainer from './GridContainer'
import ChatGrid from './ChatGrid'
import BackgroundGlow from './BackgroundGlow'

const ItemContainer = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full space-y-12">
      <CenterText/>
      <GridContainer/>
      <ChatGrid/>
      <BackgroundGlow/>
    </div>
  )
}

export default ItemContainer
