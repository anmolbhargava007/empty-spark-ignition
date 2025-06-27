
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
          <Sparkles className="w-10 h-10 text-slate-600" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
          Ready to Build
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Your blank canvas awaits. Start creating something amazing.
        </p>
        
        <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-600 transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium">Ready for your first feature</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
