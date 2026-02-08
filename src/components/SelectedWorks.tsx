import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Server, Zap, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import React, { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "Blessed Olas",
    tag: "Energy Engineering",
    description: "A nationwide solar infrastructure platform featuring automated load auditing and logic-based system sizing.",
    colors: "from-amber-400 via-yellow-500 to-amber-700",
    shadow: "shadow-amber-900/20",
    bg: "bg-gradient-to-br from-slate-900 to-slate-950",
    icon: Zap,
    tech: ["Grid Auditing", "Solar Logic", "Infra"],
    href: "https://blessed-olas.vercel.app/"
  },
  {
    id: 2,
    title: "EaasyReels",
    tag: "Digital Brand Experience",
    description: "A high-fidelity portfolio website for a content creator. Features immersive video galleries, dynamic visual storytelling, and a highly responsive media layout.",
    colors: "from-pink-500 via-cyan-500 to-pink-500",
    shadow: "shadow-pink-900/20",
    bg: "bg-gradient-to-br from-slate-900 to-slate-950",
    icon: Server,
    tech: ["Media Stream", "Analytics", "Engagement"],
    href: "https://eaasyreels.vercel.app/"
  }
];

const TiltCard = ({ project }: { project: typeof projects[0] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLinkClick = () => {
      // Prevent default to allow parent to handle navigation if needed, 
      // but here we want to open in new tab.
      // We wrap the content in an <a> tag where appropriate or use window.open
      if (project.href) {
          window.open(project.href, '_blank');
      }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleLinkClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[600px] md:h-[650px] rounded-3xl perspective-1000 group cursor-pointer"
    >
      {/* EaasyReels Special Redesign: Social Creator Profile */}
      {project.title === "EaasyReels" ? (
         <div 
         style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
         className={`absolute inset-0 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center overflow-hidden group-hover:border-pink-500/50 transition-colors duration-500`}
       >
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />
         
         {/* Mobile Frame (Creator Profile) */}
         <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] shadow-2xl border-[6px] border-slate-900 overflow-hidden transform group-hover:scale-105 transition-transform duration-700">
            
            {/* Header / Bio Section */}
            <div className="p-6 pb-2 pt-12 bg-gradient-to-b from-slate-900 to-black z-10 relative">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-500 p-[2px]">
                         <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                             <img src="https://ui-avatars.com/api/?name=ER&background=000&color=fff" alt="Profile" className="w-full h-full object-cover" />
                         </div>
                     </div>
                     <div>
                         <h4 className="font-bold text-white text-lg">EaasyReels</h4>
                         <p className="text-slate-500 text-xs">@eaasyreels_official</p>
                     </div>
                 </div>
                 
                 {/* Social Stats */}
                 <div className="flex justify-between border-y border-slate-800 py-3 mb-4">
                     <div className="text-center">
                         <div className="font-bold text-white">1.2M</div>
                         <div className="text-[10px] text-slate-500">Followers</div>
                     </div>
                     <div className="text-center">
                         <div className="font-bold text-white">50M</div>
                         <div className="text-[10px] text-slate-500">Views</div>
                     </div>
                     <div className="text-center">
                         <div className="font-bold text-white">450</div>
                         <div className="text-[10px] text-slate-500">Posts</div>
                     </div>
                 </div>
            </div>

            {/* Content Grid (Reels) */}
            <div className="p-1 grid grid-cols-2 gap-1 overflow-y-auto no-scrollbar pb-20">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-[9/16] bg-slate-900 rounded-md relative overflow-hidden group/reel">
                        <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-pink-900/20 to-purple-900/20' : 'from-cyan-900/20 to-blue-900/20'}`} />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white font-bold">
                            <Play size={10} fill="white" />
                            {10 + i}K
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity">
                            <Play size={24} fill="white" className="drop-shadow-lg" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Nav Mockup */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-black/80 backdrop-blur-md flex items-center justify-around text-slate-500 border-t border-slate-800">
                <div className="text-white"><Zap size={20} /></div>
                <div className="hover:text-pink-500"><Heart size={20} /></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                    <ArrowUpRight size={20} />
                </div>
                <div className="hover:text-cyan-500"><MessageCircle size={20} /></div>
                <div className="hover:text-white"><Share2 size={20} /></div>
            </div>
         </div>

         {/* Floating Interaction Icons (Hearts) */}
         <div className="absolute bottom-20 right-10 flex flex-col gap-4 pointer-events-none">
             {[1, 2, 3].map((i) => (
                 <motion.div 
                    key={i}
                    animate={{ y: -100, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                    className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-pink-500"
                 >
                     <Heart size={20} fill="currentColor" />
                 </motion.div>
             ))}
         </div>
          
          <div className="absolute bottom-8 left-8 z-20 pointer-events-none" style={{ transform: "translateZ(80px)" }}>
             <h3 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.colors}`}>
                 {project.title}
             </h3>
             <p className="text-slate-400 text-sm mt-2 font-mono flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                 LIVE FEED
             </p>
          </div>
       </div>
      ) : (
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className={`absolute inset-0 rounded-3xl ${project.bg} border border-slate-800 p-8 md:p-12 flex flex-col justify-between overflow-hidden group-hover:border-slate-600 transition-colors duration-500`}
      >
        {/* Background Gradient Blob */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${project.colors} opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700`} />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(50px)" }}>
            <div className="flex justify-between items-start">
                 <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white ${project.shadow}`}>
                    <project.icon className="w-6 h-6" />
                 </div>
                 <div className="px-4 py-1 rounded-full border border-slate-700 bg-slate-950/50 backdrop-blur-md text-slate-400 text-xs font-mono uppercase tracking-wider">
                    {project.tag}
                 </div>
            </div>
            
            <div className="space-y-4 pt-10">
                 <h3 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.colors}`}>
                    {project.title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-md text-lg">
                    {project.description}
                </p>
            </div>
        </div>

         {/* Bottom Tech Stack & Link */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-800/50 pt-8" style={{ transform: "translateZ(40px)" }}>
            <div className="flex gap-3">
                {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-slate-500">
                        {t}
                    </span>
                ))}
            </div>
             <motion.div 
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-white bg-slate-900 group-hover:bg-white group-hover:text-black transition-colors"
            >
                <ArrowUpRight className="w-5 h-5" />
            </motion.div>
        </div>
      </div>
      )}
    </motion.div>
  );
};

export const SelectedWorks = () => {
  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20 space-y-4"
      >
        <h2 className="text-sm font-mono text-purple-500 tracking-widest uppercase">
          // Deployed Architecture
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-purple-900/50 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {projects.map((project) => (
          <TiltCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
