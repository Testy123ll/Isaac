import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Analyzing your business logic.',
  },
  {
    icon: PenTool,
    title: 'Architecture',
    description: 'Blueprinting the stack.',
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Writing clean, scalable code.',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'System deployment & handoff.',
  },
];

export function ExecutionProtocol() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-header tracking-tight">
            Execution Protocol
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A disciplined, transparent workflow designed for speed and precision.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Base) */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block" />

          {/* Animated Connecting Line (Energy) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 -translate-y-1/2 hidden md:block origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative inline-block mb-6">
                  {/* Node Background */}
                  <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 group-hover:border-blue-500 transition-colors duration-500 flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-500" />
                  </div>
                  
                  {/* Glowing Node Effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="text-xl font-bold mb-3 font-header text-white group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
