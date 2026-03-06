import { motion, useInView } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const HackerTerminal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = "> System.scan(Isaac_Testimony)...";
  const skills = [
      "Agentic_AI_Workflows",
      "Next.js_Architecture",
      "Typescript_Enforcement",
      "RAG_Pipelines",
      "Supabase_&_Postgres"
  ];

  useEffect(() => {
    if (isInView) {
      let currentText = '';
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          currentText += fullText[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsTypingComplete(true), 500);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section className="py-20 px-4 md:px-8 flex justify-center bg-slate-950">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-lg overflow-hidden shadow-2xl font-mono"
      >
        {/* Terminal Header */}
        <div className="bg-slate-900/80 border-b border-slate-800 p-3 flex items-center justify-between">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
                <Terminal className="w-3 h-3" />
                <span>bash -- admin@isaac-portfolio</span>
            </div>
             <div className="w-4" /> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 text-sm md:text-base text-slate-300 min-h-[300px] selection:bg-blue-500/30 selection:text-blue-200">
            <div className="mb-4">
                <span className="text-green-500 mr-2">$</span>
                <span className="text-blue-400">{displayText}</span>
                <motion.span 
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-5 bg-green-500 align-middle ml-1"
                />
            </div>

            {isTypingComplete && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 pl-4 border-l-2 border-slate-800"
                >
                    <p className="text-slate-500 mb-4">// System capabilities detected:</p>
                    {skills.map((skill, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 group cursor-text"
                        >
                            <span className="text-blue-600">➜</span>
                            <span className="text-slate-200 hover:text-blue-400 transition-colors">
                                "{skill}"
                            </span>
                        </motion.div>
                    ))}
                    <div className="mt-6 pt-4 border-t border-slate-800/50 text-xs text-slate-600 flex justify-between">
                         <span>[Status: READY_FOR_DEPLOYMENT]</span>
                         <span className="animate-pulse text-green-500">● ONLINE</span>
                    </div>
                </motion.div>
            )}
        </div>
      </motion.div>
    </section>
  );
};
