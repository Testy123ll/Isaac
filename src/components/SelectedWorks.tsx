import { projects as fallbackProjects } from '../data/projects';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, Server, ShieldCheck } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
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

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"],
  );

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
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden group-hover:border-slate-600 transition-colors duration-500"
      >
        {/* Screenshot Image */}
        <div className="absolute inset-0">
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
        </div>

        {/* Top Bar: Tag & Icon */}
        <div
          className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-10"
          style={{ transform: "translateZ(50px)" }}
        >
          <div
            className={`p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-slate-800/50 text-white ${style.shadow}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-950/60 backdrop-blur-md text-slate-300 text-xs font-mono uppercase tracking-wider">
            {project.category}
          </div>
        </div>

        {/* Bottom Content Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="space-y-3 mb-6">
            <h3
              className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${style.colors}`}
            >
              {project.title}
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-md text-sm md:text-base line-clamp-4">
              {project.description}
            </p>
          </div>

          {/* Tech Stack & Link */}
          <div className="flex items-center justify-between border-t border-slate-800/50 pt-5">
            <div className="flex gap-2 flex-wrap">
              {project.techStack.map((t, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-slate-500 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-800/50"
                >
                  {t}
                </span>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="w-10 h-10 min-w-[2.5rem] rounded-full border border-slate-700 flex items-center justify-center text-white bg-slate-900/80 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors ml-2"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SelectedWorks = () => {
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
        console.error("Sanity fetch failed:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20 space-y-4"
      >
        <h2 className="text-sm font-mono text-blue-500 tracking-widest uppercase">
          // Deployed Architecture
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-blue-900/50 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {projects.map((project) => (
          <TiltCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};
