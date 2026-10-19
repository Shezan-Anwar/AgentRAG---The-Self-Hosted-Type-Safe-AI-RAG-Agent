const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm text-zinc-400 py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        
        {/* Project Branding & Brief Overview */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-100 tracking-tight">
            AgentRAG
          </h3>
          <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
            An intelligent retrieval-augmented generation system designed to parse, index, 
            and query custom document knowledge bases using vector search and generative AI.
          </p>
        </div>

        {/* Feature Badges / Tech Highlights */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-400">
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            Vector Retrieval
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            Semantic Search
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            FastAPI Backend
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            Gemini Embeddings
          </span>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-zinc-800/80 my-1" />

        {/* Author Credit */}
        <div className="text-xs text-zinc-500">
          <p>
            Created by{' '}
            <strong className="text-zinc-200 font-medium hover:text-white transition-colors">
              Shezan Anwar
            </strong>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;