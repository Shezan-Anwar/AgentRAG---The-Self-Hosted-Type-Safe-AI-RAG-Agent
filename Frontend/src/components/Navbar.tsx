import { CgEnter } from "react-icons/cg";

interface NavbarProps {
  onGetStartedClick: () => void;
}

const Navbar = ({ onGetStartedClick }: NavbarProps) => {
  return (
    <div className='bg-zinc-900/60 h-16 w-full sticky top-0 z-50 backdrop-blur-md flex justify-between items-center px-5 border-b border-zinc-700'>
      <h1 className='text-white text-lg font-bold'>AgentRAG</h1>
      
      <button 
        onClick={onGetStartedClick}
        className='bg-white hover:bg-zinc-200 rounded-xl h-9 px-4 flex justify-center font-semibold items-center gap-2 text-sm text-black transition-all active:scale-[0.98]'
      >
        <CgEnter className="text-base" />
        Get Started
      </button>
    </div>
  );
};

export default Navbar;