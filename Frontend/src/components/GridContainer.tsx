import React from 'react'
import Card from './Card'
import videoSource1 from "../assets/create_second_hook_video_fo.mp4"
import videoSource2 from "../assets/this_is_the_ui_of_agentRAG_tak.mp4"
import videoSource3 from "../assets/this_video_is_good_but_too_sho.mp4"
const GridContainer = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl ">
      <Card videoSrc={videoSource1}/>
      <Card videoSrc={videoSource2}/>
      <Card videoSrc={videoSource3}/>
    </div>
  )
}

export default GridContainer
