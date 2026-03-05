import { motion } from 'framer-motion';
import { User, Terminal } from 'lucide-react';

export const AboutSection = () => {
  const tools = [
    { name: "React", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
    { name: "Node.js", color: "text-green-400 bg-green-400/10 border-green-400/20" },
    { name: "JavaScript", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    { name: "Bootstrap", color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20" },
    { name: "HTML/CSS", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
    { name: "Figma", color: "text-pink-400 bg-pink-400/10 border-pink-400/20" },
    { name: "REST APIs", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    { name: "Git", color: "text-red-400 bg-red-400/10 border-red-400/20" }
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
       {/* Decorative gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column (Bio) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-6">
                <User size={16} />
                <span>// Developer Profile</span>
            </div>
                        <h3 className="text-3xl md:text-5xl font-bold font-header text-white mb-6">
                            The Engineer Behind BlueStark.
                        </h3>
                        
                        <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light mb-12 relative z-10">
                            <p>
                                Hi, I'm Isaac Testimony—a full-stack software engineer and the technical architect behind BlueStark. I created this studio to build high-performance digital products without the bloat of traditional agencies.
                            </p>
                            <p>
                                I personally engineer the backend architecture and design the frontend UI, ensuring zero communication gaps.
                            </p>
                            <p>
                                My core toolkit includes React, Node.js, JavaScript, and Bootstrap.
                            </p>
                        </div>
            <div className="mt-10 flex gap-4">
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-6 rounded-2xl w-fit">
                   <span className="text-3xl font-bold text-white mb-1">5+</span>
                   <span className="text-sm font-mono text-blue-400 uppercase tracking-wide">Years Exp</span>
               </div>
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-6 rounded-2xl w-fit">
                   <span className="text-3xl font-bold text-white mb-1">20+</span>
                   <span className="text-sm font-mono text-blue-400 uppercase tracking-wide">Projects</span>
               </div>
            </div>
          </motion.div>

          {/* Right Column (Toolkit) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center gap-2 text-slate-300 font-mono text-sm tracking-wide mb-8">
                  <Terminal size={18} className="text-blue-400" />
                  <span>C:\system\toolkit.exe</span>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 relative z-10">
                 {tools.map((tool, index) => (
                    <motion.div
                       key={tool.name}
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.3 + (index * 0.1), type: "spring", stiffness: 200 }}
                       whileHover={{ scale: 1.05, y: -2 }}
                       className={`px-5 py-2.5 rounded-full border bg-slate-950 font-mono text-sm md:text-base font-medium shadow-lg backdrop-blur-sm cursor-default transition-all duration-300 ${tool.color}`}
                    >
                       {tool.name}
                    </motion.div>
                 ))}
              </div>

              {/* Decorative code snippet */}
              <div className="mt-12 pt-8 border-t border-slate-800/50">
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-500 overflow-x-auto">
                     <p className="text-blue-400">const</p> engineer = {'{'}<br/>
                     &nbsp;&nbsp;stack: <span className="text-green-400">['Frontend', 'Backend']</span>,<br/>
                     &nbsp;&nbsp;focus: <span className="text-yellow-400">'Performance & UI/UX'</span>,<br/>
                     &nbsp;&nbsp;status: <span className="text-cyan-400">'Available'</span><br/>
                     {'}'};
                  </div>
              </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
