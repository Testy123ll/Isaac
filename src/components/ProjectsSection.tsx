import { projects as fallbackProjects } from '../data/projects';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';

export const ProjectsSection = () => {
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
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
               <span className="text-slate-600">//</span> Things I've Shipped
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-header tracking-tight text-white">
              Selected Works
            </h2>
          </div>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-lg font-light hidden md:block text-right">
            A showcase of custom architectures, functional UIs, and full-stack platforms built for scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative flex flex-col h-full rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              {/* Real Project Screenshot */}
              <div className="h-64 sm:h-80 w-full bg-slate-950/50 border-b border-slate-800 relative overflow-hidden group-hover:bg-blue-900/10 transition-colors duration-500 flex items-center justify-center">
                 <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                 />
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-1 relative z-10 shadow-[0_-20px_40px_rgba(2,6,23,0.8)] bg-slate-900">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <span className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 block">
                        {project.category}
                     </span>
                     <h3 className="text-3xl font-bold font-header text-white group-hover:text-blue-300 transition-colors">
                       {project.title}
                     </h3>
                   </div>
                   
                   <Link 
                     to={`/portfolio/${project.slug}`}
                     className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 -mt-2 shrink-0"
                   >
                     <ArrowUpRight size={24} />
                   </Link>
                </div>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                   {project.techStack.map(tech => (
                     <span key={tech} className="px-3 py-1 bg-slate-950 text-slate-300 rounded-full border border-slate-800 text-sm font-mono whitespace-nowrap">
                        {tech}
                     </span>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Special "Empty" Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] rounded-3xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-900/5 transition-all duration-500"
          >
             <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-blue-400 mb-6 transition-colors duration-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </div>
             <h3 className="text-2xl font-bold font-header text-white mb-4">
                Your Project Here
             </h3>
             <p className="text-slate-400 text-lg mb-8 max-w-sm mx-auto">
                Reserve this spot for our next big build. Ready to turn that complex idea into reality?
             </p>
             <a 
                href="#contact"
                className="px-8 py-3 bg-transparent border border-blue-500 text-blue-400 hover:text-white rounded-full font-semibold transition-all duration-300 hover:bg-blue-600"
             >
                Let's Talk
             </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
