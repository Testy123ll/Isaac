import { projects as fallbackProjects } from '../data/projects';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Zap, Server, ShieldCheck } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';

const projectStyles: Record<string, any> = {
  'austin-elite-smiles': {
    colors: "from-blue-400 via-indigo-500 to-blue-700",
    shadow: "shadow-blue-900/20",
    icon: ShieldCheck
  },
  'eaasyreels': {
    colors: "from-pink-500 via-cyan-500 to-pink-500",
    shadow: "shadow-pink-900/20",
    icon: Server
  },
  'blessed-olas': {
    colors: "from-amber-400 via-yellow-500 to-amber-700",
    shadow: "shadow-amber-900/20",
    icon: Zap
  }
};

const TiltCard = ({ project }: { project: typeof fallbackProjects[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

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
      navigate(`/portfolio/${project.slug}`);
  };

  const style = projectStyles[project.slug] || projectStyles['blessed-olas'];
  const Icon = style.icon;

  return (
    <motion.div
      onClick={handleLinkClick}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative block w-full h-[500px] md:h-[600px] rounded-3xl perspective-1000 group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden group-hover:border-slate-600 transition-colors duration-500 shadow-xl shadow-black/50"
      >
        {/* Screenshot Image instead of dynamic abstract background */}
        <div className="absolute inset-0">
          <img 
            src={project.imageUrl} 
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top opacity-50 transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Top Bar: Tag & Icon */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-10" style={{ transform: "translateZ(50px)" }}>
          <div className={`p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-slate-800/50 text-white ${style.shadow}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-950/60 backdrop-blur-md text-slate-300 text-xs font-mono uppercase tracking-wider">
            {project.category}
          </div>
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-32" style={{ transform: "translateZ(60px)" }}>
          <div className="space-y-3 mb-6">
            <h3 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${style.colors}`}>
              {project.title}
            </h3>
            <p className="text-slate-300 drop-shadow-md leading-relaxed max-w-md text-sm md:text-base line-clamp-4">
              {project.description}
            </p>
          </div>

          {/* Tech Stack & Link */}
          <div className="flex items-center justify-between border-t border-slate-800/50 pt-5">
            <div className="flex gap-2 flex-wrap">
              {project.techStack.map((t, i) => (
                <span key={i} className="text-xs font-mono text-slate-100 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-800/50">
                  {t}
                </span>
              ))}
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="min-w-10 min-h-10 w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-white bg-slate-900/80 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PortfolioPage = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]{
          title, "slug": slug.current, category, description, techStack, liveUrl, "imageUrl": imageUrl.asset
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          const formatted = data.map((p: any) => ({
            ...p,
            imageUrl: p.imageUrl ? urlFor(p.imageUrl).url() : fallbackProjects.find((fb) => fb.slug === p.slug)?.imageUrl || '',
          }));
          setProjects(formatted);
        }
      } catch (err) {
        console.error("Sanity fetch failed, using local fallback data:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-32 bg-slate-950 min-h-screen relative overflow-hidden">
        {/* Techy background */}
       <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30">
          <div className="absolute w-[800px] h-[800px] border border-slate-800/20 rounded-full flex items-center justify-center" />
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 space-y-4 max-w-3xl"
        >
            <div className="inline-flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
               <span className="text-slate-600">//</span> Case Studies & Architecture
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-header tracking-tight text-white leading-tight">
               Built for Scale.<br/>Engineered for Growth.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light">
                Deep dives into the technical platforms I've deployed for ambitious founders.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {projects.map((project) => (
            <TiltCard key={project.slug} project={project} />
          ))}

          {/* Special "Empty" Card from Projects Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group flex flex-col items-center justify-center text-center p-12 h-[500px] md:h-[600px] rounded-3xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-900/5 transition-all duration-500"
          >
             <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-blue-400 mb-6 transition-colors duration-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </div>
             <h3 className="text-3xl font-bold font-header text-white mb-4">
                Your Project Here
             </h3>
             <p className="text-slate-400 text-lg mb-8 max-w-sm mx-auto">
                Ready to turn that complex idea into reality? We engineer the backend logic and design the frontend interfaces.
             </p>
             <a 
                href="/contact"
                className="px-8 py-3 bg-transparent border border-blue-500 text-blue-400 hover:text-white rounded-full font-semibold transition-all duration-300 hover:bg-blue-600"
             >
                Start a Project
             </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
