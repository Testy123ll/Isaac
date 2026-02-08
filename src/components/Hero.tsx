import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
      
      {/* Tech Orbit Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
         {/* Orbit Circle 1 */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] border border-slate-800/30 rounded-full flex items-center justify-center"
         >
            <div className="absolute -top-3 bg-slate-950 p-2 rounded-full border border-slate-800 text-purple-500/50">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>
            </div>
            <div className="absolute -bottom-3 bg-slate-950 p-2 rounded-full border border-slate-800 text-cyan-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wind"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
            </div>
         </motion.div>

         {/* Orbit Circle 2 (Reverse) */}
         <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[700px] h-[700px] border border-slate-800/20 rounded-full flex items-center justify-center"
         >
             <div className="absolute top-1/2 -left-3 bg-slate-950 p-2 rounded-full border border-slate-800 text-green-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
             </div>
         </motion.div>
      </div>

      <div className="z-10 text-center space-y-6 px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 text-purple-500 font-mono text-xs md:text-sm tracking-[0.2em]"
        >
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-purple-600"></span>
            </span>
            SYSTEM ONLINE
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
           animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
           transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-tight">
            ISAAC<br className="md:hidden" /> TESTIMONY
          </h1>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-slate-400 text-lg md:text-2xl font-light tracking-wide"
        >
            FULL-STACK GROWTH ENGINEER
        </motion.p>
        
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-12 text-[10px] md:text-xs text-slate-600 font-mono tracking-widest uppercase"
        >
            [ ARCHITECTURE POINTER :: <span className="text-purple-500">REACT</span> . <span className="text-purple-500">TAILWIND</span> . <span className="text-purple-500">MOTION</span> ]
        </motion.div>
      </div>

      {/* Decorative Grid or Elements could be added here */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>
    </section>
  );
};
