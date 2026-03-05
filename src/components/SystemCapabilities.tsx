import { motion } from 'framer-motion';
import { Cpu, Zap, Globe } from 'lucide-react';

const capabilities = [
  {
    icon: Cpu,
    title: "Custom Growth Engines",
    subtitle: "Architecture",
    description: "React & Node.js platforms tailored to your specific business logic, not generic templates."
  },
  {
    icon: Zap,
    title: "Business Logic Automation",
    subtitle: "Automation",
    description: "WhatsApp APIs, Email triggers, and Scheduling systems that run on autopilot."
  },
  {
    icon: Globe,
    title: "Technical Infrastructure",
    subtitle: "Visibility",
    description: "Google-compliant SEO structures ensuring high ranking and sub-second load times."
  }
];

export function SystemCapabilities() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-header tracking-tight">
            System Capabilities
          </h2>
          <p className="text-slate-400 text-lg">
            Engineering protocols deployed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
            >
              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-900/10">
                  <cap.icon size={28} />
                </div>
                
                <div className="mb-2">
                   <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                    // {cap.subtitle}
                   </span>
                </div>
                
                <h3 className="text-2xl font-bold font-header text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {cap.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
