import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Terminal } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AboutSection = () => {
  const [aboutTitle, setAboutTitle] = useState<string | null>(null);
  const [aboutBio, setAboutBio] = useState<string | null>(null);
  const [stat1Val, setStat1Val] = useState<string | null>(null);
  const [stat1Lbl, setStat1Lbl] = useState<string | null>(null);
  const [stat2Val, setStat2Val] = useState<string | null>(null);
  const [stat2Lbl, setStat2Lbl] = useState<string | null>(null);
  const [stat3Val, setStat3Val] = useState<string | null>(null);
  const [stat3Lbl, setStat3Lbl] = useState<string | null>(null);
  const [stat4Val, setStat4Val] = useState<string | null>(null);
  const [stat4Lbl, setStat4Lbl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('section, key, value')
          .in('section', ['about', 'stats']);
        
        if (error) throw error;
        if (data) {
          data.forEach(row => {
            if (row.section === 'about') {
              if (row.key === 'title') setAboutTitle(row.value);
              if (row.key === 'bio') setAboutBio(row.value);
            } else if (row.section === 'stats') {
              if (row.key === 'stat1_val') setStat1Val(row.value);
              if (row.key === 'stat1_lbl') setStat1Lbl(row.value);
              if (row.key === 'stat2_val') setStat2Val(row.value);
              if (row.key === 'stat2_lbl') setStat2Lbl(row.value);
              if (row.key === 'stat3_val') setStat3Val(row.value);
              if (row.key === 'stat3_lbl') setStat3Lbl(row.value);
              if (row.key === 'stat4_val') setStat4Val(row.value);
              if (row.key === 'stat4_lbl') setStat4Lbl(row.value);
            }
          });
        }
      } catch (err) {
        console.warn('Failed to fetch about and stats content, using defaults:', err);
      }
    };
    fetchAboutContent();
  }, []);

  const skillsCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express"]
    },
    {
      category: "Database",
      skills: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"]
    },
    {
      category: "Tools",
      skills: ["Git", "GitHub", "Figma", "VS Code", "Cursor"]
    },
    {
      category: "Deployment",
      skills: ["Vercel", "Netlify"]
    }
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
                            {aboutTitle || "The Developer Behind the Work."}
                        </h3>
                        
                        <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light mb-12 relative z-10">
                            {aboutBio ? (
                              aboutBio.split('\n').filter(p => p.trim() !== '').map((para, idx) => (
                                <p key={idx}>{para}</p>
                              ))
                            ) : (
                              <>
                                <p>
                                    Hi, I'm Isaac Testimony — a Full-Stack Web Developer and final-year Civil Engineering student. My engineering background shapes everything I build. I think in systems, plan before I write a single line of code, and solve problems from first principles.
                                </p>
                                <p>
                                    When I build your website, I'm thinking about structure, performance, and how it holds up under real-world pressure — the same discipline I apply to engineering problems.
                                </p>
                                <p>
                                    I personally handle everything: the architecture, the frontend, the backend, and the launch. No handoffs, no communication gaps, no agency markup.
                                </p>
                              </>
                            )}
                        </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-4 rounded-2xl text-center sm:text-left">
                   <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat1Val || "15+"}</span>
                   <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">{stat1Lbl || "Projects Delivered"}</span>
               </div>
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-4 rounded-2xl text-center sm:text-left">
                   <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat2Val || "10+"}</span>
                   <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">{stat2Lbl || "Happy Clients"}</span>
               </div>
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-4 rounded-2xl text-center sm:text-left">
                   <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat3Val || "2+"}</span>
                   <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">{stat3Lbl || "Years Building"}</span>
               </div>
               <div className="flex flex-col border border-slate-800 bg-slate-900/50 p-4 rounded-2xl text-center sm:text-left">
                   <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat4Val || "100%"}</span>
                   <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">{stat4Lbl || "On-Time Delivery"}</span>
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

              <div className="space-y-6 relative z-10">
                 {skillsCategories.map((group, groupIndex) => (
                    <motion.div 
                      key={group.category} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * groupIndex }}
                      className="space-y-2"
                    >
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
                        // {group.category}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, index) => (
                           <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.05 * index, type: "spring", stiffness: 200 }}
                              whileHover={{ scale: 1.05, y: -1 }}
                              className="px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950 font-mono text-xs md:text-sm text-slate-300 shadow-sm backdrop-blur-sm cursor-default hover:border-slate-600 transition-colors"
                           >
                              {skill}
                           </motion.div>
                        ))}
                      </div>
                    </motion.div>
                 ))}
              </div>

              {/* Decorative code snippet */}
              <div className="mt-12 pt-8 border-t border-slate-800/50">
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-500 overflow-x-auto">
                     <p className="text-blue-400">const</p> developer = {'{'}<br/>
                     &nbsp;&nbsp;stack: <span className="text-green-400">['Full-Stack', 'AI Integrations']</span>,<br/>
                     &nbsp;&nbsp;focus: <span className="text-yellow-400">'Scalability & UI/UX'</span>,<br/>
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
