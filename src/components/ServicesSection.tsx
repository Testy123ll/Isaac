import { motion } from 'framer-motion';
import { Code2, Blocks, Rocket, LayoutTemplate, Search, Cpu } from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: Rocket,
      title: "Platform Engineering",
      description: "Designing and engineering robust web applications from the ground up, bypassing templates for pure, unrestricted custom code.",
      tag: "CREATION"
    },
    {
      icon: LayoutTemplate,
      title: "Technical Redesigns",
      description: "Overhauling failing, slow websites into blazing-fast, highly converting architectures engineered for modern web standards.",
      tag: "REDESIGN"
    },
    {
      icon: Search,
      title: "Algorithmic SEO",
      description: "Implementing server-side rendering, schema markup, and advanced optimization pipelines to absolutely dominate search visibility.",
      tag: "VISIBILITY"
    },
    {
      icon: Cpu,
      title: "AI & Automation",
      description: "Building intelligent RAG pipelines, custom LLM tools, and automated backend systems to drastically scale operational output.",
      tag: "INTELLIGENCE"
    },
    {
      icon: Code2,
      title: "Deep Website Auditing",
      description: "Technical tear-downs to identify render-blocking assets, DOM bloat, and architectural flaws causing traffic drop-offs.",
      tag: "PERFORMANCE"
    },
    {
      icon: Blocks,
      title: "Conversion Architecture",
      description: "Restructuring user flows and implementing strict behavioral tracking to maximize high-ticket lead generation and sales.",
      tag: "CRO"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements for techy vibe */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
             <span className="text-slate-600">//</span> Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-header tracking-tight text-white leading-tight">
            Engineered Solutions.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            I don't just build websites; I audit failing platforms and engineer the exact solution required to scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 md:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
            >
              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-500 shadow-lg shadow-blue-900/10">
                      <service.icon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-mono text-slate-500 px-3 py-1 bg-slate-950 rounded-full border border-slate-800">
                        {service.tag}
                    </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold font-header text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
