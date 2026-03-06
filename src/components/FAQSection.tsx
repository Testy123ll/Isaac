import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquareCode } from 'lucide-react';

const faqs = [
  {
    question: "Do you work with No-Code tools?",
    answer: "Yes. While I advocate for and specialize in custom React/Node architecture for scalability, I am deeply experienced with No-Code platforms. I use them when speed to market and budget demand rapid prototyping over complex custom logic."
  },
  {
    question: "Do you build with WordPress or Wix?",
    answer: "I specialize in custom React applications. I actively steer clear of WordPress/Wix because my focus is building scalable business engines, not basic blogs."
  },
  {
    question: "Why is custom coding better than No-Code?",
    answer: "No-Code platforms have strict limits and vendor lock-in. Custom code offers 100% ownership, zero plugin bloat, complete control over data architecture, and unmatched performance."
  },
  {
    question: "What is your typical timeline?",
    answer: "Standard deployment for simple apps takes a few weeks. Full SaaS platforms and complex data dashboards typically take 1-2 months from discovery to launch."
  },
  {
    question: "Do you handle hosting and domains?",
    answer: "Yes. I deploy infrastructure on scalable edges like Vercel or AWS for maximum uptime and sub-second load speeds."
  },
  {
    question: "Will my site rank on Google (SEO)?",
    answer: "Absolutely. I build with semantic HTML, optimized assets, and Server-Side Rendering (SSR) patterns for superior search visibility compared to standard templates."
  },
  {
    question: "Is the code secure?",
    answer: "Yes. Unlike WordPress, which is notoriously vulnerable to plugin hacks, my custom builds are closed-circuit, following modern authentication protocols."
  },
  {
    question: "Can I update the content myself?",
    answer: "Yes. I can integrate a Headless CMS (like Sanity or Strapi) so you can edit text and images without touching code."
  },
  {
    question: "Do you handle both design and development?",
    answer: "Yes, I engineer the backend logic and design the frontend interfaces. This ensures no communication gaps between design and engineering, resulting in a cohesive end product."
  },
  {
    question: "What is the payment structure?",
    answer: "Typically a 50% initialization fee to begin architecture, and 50% upon successful deployment, depending on project scope."
  },
  {
    question: "Why does my current website load so slowly?",
    answer: "Performance bottlenecks are often caused by unoptimized images, bloated JavaScript, or poor server routing. I engineer blazingly fast sites using Next.js and Vercel edge networks to ensure sub-second load times."
  },
  {
    question: "How do you approach website redesigns?",
    answer: "We don't just paint a new coat of colors over a broken engine. A redesign starts with analyzing user flow, fixing conversion bottlenecks, and building a technically sound architecture from the ground up."
  },
  {
    question: "Will redesigning my website hurt my current SEO rankings?",
    answer: "If done incorrectly, yes. I implement careful 301 redirect mapping, preserve URL structures where possible, and ensure the new technical architecture actively boosts your rankings rather than dropping them."
  },
  {
    question: "What is Technical SEO?",
    answer: "It's the foundation of search engine visibility. It involves optimizing site speed, mobile-friendliness, structured data (schema), XML sitemaps, and Core Web Vitals so Google can efficiently crawl and index your site."
  },
  {
    question: "Why are Core Web Vitals important?",
    answer: "Core Web Vitals are Google's metrics for user experience. Failing these metrics results in lower rankings and higher bounce rates. My custom builds are engineered to easily ace these performance tests."
  },
  {
    question: "Can you integrate third-party APIs into my site?",
    answer: "Yes. Whether it's a custom Calendly integration, Stripe payments, Salesforce CRM, or complex AI pipelines using OpenAI, I can engineer seamless connections."
  },
  {
    question: "What's the difference between a website and a web application?",
    answer: "A website typically delivers content-driven information, while a web application features complex user interactions, authentication, databases, and dynamic logic (like a SaaS product). I engineer both."
  },
  {
    question: "How do you ensure my website provides a good mobile experience?",
    answer: "I design mobile-first. I don't just shrink a desktop site; I engineer specific mobile navigation patterns, optimized touch targets, and responsive layouts that perform flawlessly on any device."
  },
  {
    question: "What happens after the website is launched?",
    answer: "I offer ongoing retainer packages for continuous performance optimization, technical SEO monitoring, scaling architecture, and adding new features as your business grows."
  },
  {
    question: "Do you use templates?",
    answer: "No. Templates constrain functionality and introduce bloated code. I build custom, purpose-driven architectures tailored to your specific business conversion goals."
  },
  {
    question: "How do you handle website accessibility (ADA compliance)?",
    answer: "Accessibility is built into the foundation. I use semantic HTML, ARIA labels, adequate color contrast, and keyboard navigation support to ensure your site is usable by everyone."
  },
  {
    question: "Can you migrate my data from my old platform?",
    answer: "Yes. I can engineer automated migration scripts to seamlessly transfer your blogs, user data, e-commerce products, and order history to the new, modern architecture."
  },
  {
    question: "What analytics tools do you integrate?",
    answer: "Beyond basic Google Analytics, I can implement advanced tracking mechanisms like PostHog or Mixpanel for deep technical insights into user journeys, drop-offs, and feature adoption."
  },
  {
    question: "Do you provide training on how to use the CMS?",
    answer: "Absolutely. While the custom-engineered Dashboards (like Sanity Studio) are incredibly intuitive, I provide operational documentation so your team can comfortably manage content."
  },
  {
    question: "Can you implement AI chatbots or automation?",
    answer: "Yes. I can build intelligent RAG (Retrieval-Augmented Generation) pipelines and integrate LLMs directly into your platform to automate customer support or internal workflows."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950/50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
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
            Clear answers to help you understand how we can collaborate.
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
                  className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
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
                      <p className="px-6 md:px-8 text-slate-400 text-lg leading-relaxed font-light">
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
