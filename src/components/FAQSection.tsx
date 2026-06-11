import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquareCode } from 'lucide-react';
import { supabase } from '../lib/supabase';

const defaultFaqs = [
  {
    question: "How do you work?",
    answer: "I start by understanding your business and what the site needs to achieve. Then I define the structure, design the layout, build it in clean code, test it, and hand it over live. You're updated at every stage, with no surprises."
  },
  {
    question: "How long does a project take?",
    answer: "A standard business website takes 1–2 weeks. Landing pages can be done in 3–5 days. Larger web applications are scoped per project. I give you a clear timeline before we start."
  },
  {
    question: "How much do you charge?",
    answer: "Pricing depends on the scope of the project. A basic business website starts from $300. Landing pages start from $150. I offer flat-fee pricing with no hidden costs and no hourly surprises. Message me and I'll give you an exact quote."
  },
  {
    question: "How many revisions do I get?",
    answer: "You get 2 rounds of revisions included in every project. I build to your brief from the start, so most clients don't need more than one round. Additional revisions beyond that are available at a small flat fee."
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes. Every project includes 2 weeks of free post-launch support. After that, I offer affordable monthly maintenance packages covering updates, performance monitoring, and content changes."
  },
  {
    question: "What's your pricing model?",
    answer: "I charge a flat project fee rather than an hourly rate. You know the full cost before I write a single line of code. 50% upfront, 50% on delivery. No retainers unless you want ongoing maintenance."
  }
];

export const FAQSection = () => {
  const [faqs, setFaqs] = useState(defaultFaqs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('question, answer')
          .order('order_index', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs from Supabase, using defaults:", err);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase mb-4">
             <MessageSquareCode size={16} />
             <span>// Common Queries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-header tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg mx-auto font-light">
            Clear answers to help you understand how I work with you.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-slate-900 border-blue-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-4 py-4 sm:px-8 sm:py-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                >
                  <span className={`text-xl font-bold font-header transition-colors ${
                      isOpen ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'border-slate-700 text-slate-400'
                  }`}>
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${index}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginBottom: 24 },
                        collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-4 sm:px-8 text-slate-400 text-lg leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
