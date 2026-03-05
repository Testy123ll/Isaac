import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';

const faqs = [
  {
    question: "Do you build with WordPress or Wix?",
    answer: "No. I engineer custom React applications. WordPress is for blogs; I build scalable business engines."
  },
  {
    question: "Why is custom coding better than No-Code?",
    answer: "No-Code platforms have limits. Custom code offers 100% ownership, zero plugin bloat, and unmatched speed."
  },
  {
    question: "What is your typical timeline?",
    answer: "Standard deployment is 2-4 weeks, depending on complexity and logic requirements."
  },
  {
    question: "Do you handle hosting and domains?",
    answer: "Yes. I deploy infrastructure on Vercel or AWS for maximum uptime and speed."
  },
  {
    question: "Will my site rank on Google (SEO)?",
    answer: "Absolutely. I build with semantic HTML and Server-Side Rendering (SSR) for superior search visibility."
  },
  {
    question: "Is the code secure?",
    answer: "Yes. Unlike WordPress, which is vulnerable to plugin hacks, my custom builds are closed-circuit and secure."
  },
  {
    question: "Can I update the content myself?",
    answer: "Yes. I can integrate a Headless CMS (like Sanity) so you can edit text without touching code."
  },
  {
    question: "Do you offer maintenance?",
    answer: "Yes. I offer 'System Health' retainers for updates, backups, and feature expansions."
  },
  {
    question: "What happens if I need to scale up?",
    answer: "My code is modular. We can add e-commerce or user portals later without rebuilding the site."
  },
  {
    question: "What is the payment structure?",
    answer: "50% initialization fee to begin architecture, 50% upon successful deployment."
  }
];

export function SystemQueries() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-header tracking-tight">
            Protocol Queries
          </h2>
          <p className="text-slate-400 text-lg">
            System Knowledge Base.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden hover:border-slate-700 transition-colors h-fit"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-medium font-header text-slate-200">
                  {faq.question}
                </span>
                <span className={clsx(
                  "p-1.5 rounded-full transition-colors flex-shrink-0 ml-4",
                  openIndex === index ? "bg-blue-900/30 text-blue-400" : "bg-slate-800 text-slate-400"
                )}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
