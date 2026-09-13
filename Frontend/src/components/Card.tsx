

interface CardProps{
  videoSrc: string;
}
const Card:React.FC<CardProps> = ({videoSrc}) => {
  return (
    <div className='bg-zinc-900/50 border border-zinc-800  rounded-xl hover:border-zinc-700 transition-colors z-10 backdrop-blur-xl shadow-lg shadow-black/50'>
      <video 
     
  width="100%" 
  autoPlay 
  loop 
  muted 
  playsInline 
  preload="metadata"
  className='rounded-xl'
>
  <source src={videoSrc} type="video/mp4" />
  Your browser does not support the video tag.
</video>
      </div>

  )
}

export default Card