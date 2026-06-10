import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const defaultTestimonials = [
  {
    name: "John Doe",
    position: "CEO",
    company: "Acme Corp",
    body: "[Placeholder: Real testimonial coming soon]",
    avatar_url: "",
    color: "bg-blue-500"
  },
  {
    name: "Alice Smith",
    position: "Founder",
    company: "SaaS Startup",
    body: "[Placeholder: Real testimonial coming soon]",
    avatar_url: "",
    color: "bg-pink-500"
  },
  {
    name: "Karl Brown",
    position: "Product Manager",
    company: "Tech Solutions",
    body: "[Placeholder: Real testimonial coming soon]",
    avatar_url: "",
    color: "bg-amber-500"
  }
];

export function SuccessLogs() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setList(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials from Supabase:", err);
      }
    };
    fetchTestimonials();
  }, []);

  const items = list.length > 0 ? list : defaultTestimonials;
  const colors = ["bg-blue-500", "bg-pink-500", "bg-amber-500", "bg-purple-500", "bg-green-500"];
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
          {[...items, ...items].map((t, i) => {
            const initials = t.name.split(' ').map((n: any) => n[0]).join('').substring(0, 2).toUpperCase();
            const colorClass = t.color || colors[i % colors.length];
            return (
              <div 
                  key={i} 
                  className="flex-shrink-0 w-[400px] bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full ${colorClass} overflow-hidden flex items-center justify-center font-bold text-black font-mono shadow-lg shrink-0`}>
                      {t.avatar_url ? (
                        <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                  </div>
                  <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{t.position} at {t.company}</p>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          VERIFIED CLIENT
                      </div>
                  </div>
                </div>
                <p className="text-slate-300 italic leading-relaxed">
                  "{t.body || t.quote}"
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
