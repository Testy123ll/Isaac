import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const painPoints = [
  {
    quote: "People Google my business and find nothing.",
    description: "No website means no credibility. Customers move on to the next result before they ever reach out to you."
  },
  {
    quote: "He was responsive until I paid the deposit.",
    description: "Missed deadlines, ignored messages, half-finished work. I had to start over with someone else entirely.",
    highlighted: true
  },
  {
    quote: "I built it on Wix. My 12-year-old niece said it looked cheap.",
    description: "Free website builders are obvious. They signal that you don't take your business seriously — even when you do."
  },
  {
    quote: "My site takes 8 seconds to load. I know people are leaving.",
    description: "Every second of load time costs you visitors. A broken, slow site is worse than no site at all."
  },
  {
    quote: "They quoted me £8,000. For five pages and a contact form.",
    description: "Big agency, big overhead, junior developer doing the actual work. You're paying for their office — not your website."
  },
  {
    quote: "I've explained this idea to three developers. None of them built what I described.",
    description: "The vision is clear in your head. Finding someone who listens, understands, and actually delivers it is the hard part."
  }
];

export function PainPointsSection() {
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);

  useEffect(() => {
    const fetchPainPointsContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('key, value')
          .eq('section', 'pain_points');
        
        if (error) throw error;
        if (data) {
          data.forEach(row => {
            if (row.key === 'title') setTitle(row.value);
            if (row.key === 'desc') setDesc(row.value);
          });
        }
      } catch (err) {
        console.warn('Failed to fetch pain points content, using defaults:', err);
      }
    };
    fetchPainPointsContent();
  }, []);

  return (
    <section id="pain-points" className="py-24 bg-[#030712] relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
        .serif-title {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>
      
      {/* Background radial overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,#1e3a8a05,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,#0ea5e905,transparent_65%)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Label & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 font-mono text-sm tracking-widest uppercase mb-2">
             — PAIN POINTS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight serif-title italic">
            {title || "You've Got the Vision. The Build Is Where It Falls Apart."}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-4">
            {desc || "These aren't hypothetical struggles. These are the exact conversations I have every week with founders who found me right before they gave up."}
          </p>
        </motion.div>

        {/* 6 Cards in a Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group p-8 rounded-3xl bg-slate-900/40 border transition-all duration-300 ${
                point.highlighted 
                  ? 'border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-slate-900/60' 
                  : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60'
              }`}
            >
              <h3 className="text-xl md:text-2xl font-bold italic text-white mb-4 leading-snug">
                "{point.quote}"
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16 space-y-6 max-w-md mx-auto"
        >
          <p className="text-slate-300 text-lg font-medium">
            If any of these sound familiar — let's talk.
          </p>
          <a
            href="https://wa.link/0cit50"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <span>Get a Free Consultation</span>
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
