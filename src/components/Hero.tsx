import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

export const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
      
      {/* Tech Orbit Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-50 md:opacity-100">
         {/* Orbit Circle 1 */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-slate-800/40 rounded-full flex items-center justify-center"
         >
            <div className="absolute -top-3 bg-slate-950 p-2 rounded-full border border-slate-800 text-blue-500/50">
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
            className="absolute w-[500px] h-[500px] md:w-[900px] md:h-[900px] border border-slate-800/20 rounded-full flex items-center justify-center"
         >
             <div className="absolute top-1/2 -left-3 bg-slate-950 p-2 rounded-full border border-slate-800 text-green-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
             </div>
         </motion.div>
      </div>

      <div className="z-10 text-center space-y-8 px-4 max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-300 font-mono text-sm tracking-widest uppercase">
              ✦ A BlueStark Initiative
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-header tracking-tight text-white mb-8 leading-tight"
          >
            Welcome to{' '}
            <span className="inline-block text-blue-600">
              {"BlueStark.".split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-blue-400 animate-gradient-x">
              Custom Architecture.
            </span>
            <br />
            Pure Results.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Engineered by Isaac Testimony. From ambitious founders to scaling startups, BlueStark turns complex ideas into lightning-fast, fully functional web applications. If it requires custom logic and flawless UI, we build it.
          </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
            <HashLink 
              smooth
              to="/#contact"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>🚀 Start Your Project</span>
            </HashLink>
            <HashLink 
              smooth
              to="/#projects"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-full font-semibold transition-all duration-300 hover:bg-slate-800/50 flex items-center justify-center"
            >
              <span>View My Work</span>
            </HashLink>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-slate-800/50 bg-slate-950/80 backdrop-blur-md overflow-hidden py-3">
        <div className="flex w-fit animate-marquee whitespace-nowrap">
           {/* Duplicate array for seamless infinite scroll */}
           {[...Array(4)].map((_, idx) => (
             <div key={idx} className="flex items-center shrink-0">
               <span className="mx-8 text-sm font-mono text-blue-400/80">🚀 Fast SaaS Delivery ✦ 📱 Mobile-First Always ✦ ⚡ React • Node.js • JavaScript • Bootstrap ✦ ✅ From Idea to Launch ✦ 🔒 Scalable & Secure</span>
             </div>
           ))}
        </div>
      </div>

      {/* Decorative Grid or Elements could be added here */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
