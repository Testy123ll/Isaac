import { motion } from 'framer-motion';

const testimonials = [
  {
    initials: "BO",
    company: "Blessed Olas",
    quote: "Isaac didn't just build a site; he built a sales machine. The load calculator saves us 5 hours of manual work every day.",
    color: "bg-amber-500"
  },
  {
    initials: "ER",
    company: "EaasyReels",
    quote: "The visual flow is incredible. It perfectly captures the high-energy vibe of my content brand.",
    color: "bg-pink-500"
  },
  // Duplicated for marquee effect
  {
    initials: "BO",
    company: "Blessed Olas",
    quote: "Isaac didn't just build a site; he built a sales machine. The load calculator saves us 5 hours of manual work every day.",
    color: "bg-amber-500"
  },
  {
    initials: "ER",
    company: "EaasyReels",
    quote: "The visual flow is incredible. It perfectly captures the high-energy vibe of my content brand.",
    color: "bg-pink-500"
  }
];

export function SuccessLogs() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold font-header tracking-tight text-center md:text-left">
          Success Logs_
        </h2>
      </div>

      <div className="flex relative items-center">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 20 
            }}
        >
          {testimonials.map((t, i) => (
            <div 
                key={i} 
                className="flex-shrink-0 w-[400px] bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-bold text-black font-mono shadow-lg`}>
                    {t.initials}
                </div>
                <div>
                    <h4 className="font-bold text-white">{t.company}</h4>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        VERIFIED CLIENT
                    </div>
                </div>
              </div>
              <p className="text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
