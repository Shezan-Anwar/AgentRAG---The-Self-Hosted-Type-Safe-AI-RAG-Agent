import Card from './Card';
import videoSource1 from "../assets/create_second_hook_video_fo.mp4";
import videoSource2 from "../assets/this_is_the_ui_of_agentRAG_tak.mp4";
import videoSource3 from "../assets/this_video_is_good_but_too_sho.mp4";

const GridContainer = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pb-16">
      
      <div className="relative flex items-center justify-center w-full">
        
        <div className="w-1/3 -mr-12 z-10 scale-95 opacity-80 transition-transform">
          <Card videoSrc={videoSource1} />
        </div>

        
        <div className="w-5/12 z-20 shadow-2xl scale-105">
          <Card videoSrc={videoSource2} />
        </div>
        <div className="w-1/3 -ml-12 z-10 scale-95 opacity-80 transition-transform">
          <Card videoSrc={videoSource3} />
        </div>
      </div>
    </div>
  );
};

export default GridContainer;