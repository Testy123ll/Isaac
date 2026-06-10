import { motion } from 'framer-motion';

export const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "We Define the Brief",
      description: "I learn your business, your goals, and what the site needs to do before writing a single line of code."
    },
    {
      number: "02",
      title: "Design & Wireframe",
      description: "I map out the layout and user flow, making sure every page is built to convert."
    },
    {
      number: "03",
      title: "Build & Test",
      description: "I engineer the frontend and backend simultaneously, testing as I go."
    },
    {
      number: "04",
      title: "Launch & Handover",
      description: "I deploy the site, make sure everything runs cleanly, and hand over with full documentation."
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-950/50 relative overflow-hidden pointer-events-auto">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
             <span className="text-slate-600">//</span> How I Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white mb-6">
            The Engineering Process
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Here's exactly how I work — from your first message to a live, performing website.
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal connecting line (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-0 w-full h-[1px] bg-slate-800">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
               className="h-full bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-transparent"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Mobile connecting line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute left-6 top-24 bottom-[-48px] w-[1px] bg-slate-800 z-0"></div>
                )}

                <div className="relative z-10 flex flex-col md:items-center md:text-center group">
                  <div className="w-24 h-24 mb-6 relative shrink-0">
                    <div className="absolute inset-0 border-2 border-slate-800 rounded-full group-hover:border-blue-500/50 transition-colors duration-500 bg-slate-950 flex items-center justify-center -ml-6 md:ml-0">
                      <span className="font-mono text-2xl text-slate-500 group-hover:text-blue-400 font-bold transition-colors">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-header text-white mb-3 group-hover:text-blue-200 transition-colors pl-12 md:pl-0">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed pl-12 md:pl-0">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
