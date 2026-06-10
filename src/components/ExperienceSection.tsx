import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: "Freelance Web Developer",
    period: "2022 — Present",
    description: "Building websites and web apps for small businesses and founders across Nigeria, UK, and the Middle East. Projects span business websites, landing pages, and custom web applications."
  },
  {
    title: "Web Design & Lead Generation Agency",
    period: "2023 — Present",
    description: "Running a solo agency offering flat-fee website builds and lead generation services, targeting businesses with no web presence across multiple markets."
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Subtle Background Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,#1e3a8a0a,transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
             <span className="text-slate-600">//</span> Career Timeline
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white mb-6">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Proven track record of engineering digital solutions and launching platforms for global clients.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative border-l-2 border-slate-800 ml-4 md:ml-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative pl-8 md:pl-12 pb-16 last:pb-0"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <Briefcase size={18} />
                    </div>
                    <h3 className="text-2xl font-bold font-header text-white group-hover:text-blue-300 transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-400 w-fit">
                    <Calendar size={12} className="text-blue-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-base leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
