import { useRef } from 'react';
import Navbar from './Navbar';
import ItemContainer from './ItemContainer';
import Footer from './Footer';

const Background = () => {
  const itemContainerRef = useRef<HTMLDivElement>(null);

  const scrollToChat = () => {
    itemContainerRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden'>
      <Navbar onGetStartedClick={scrollToChat} />
      
      <div ref={itemContainerRef}>
        <ItemContainer />
      </div>
      
      <Footer />
    </div>
  );
};

export default Background;