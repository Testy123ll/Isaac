import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `You are Isaac's personal AI assistant on his portfolio website. Your job is to answer any question a potential client or collaborator might ask — thoroughly, honestly, and in a friendly but professional tone. Keep answers concise but complete. Always end responses that involve hiring or starting a project by pointing to WhatsApp.

## WHO ISAAC IS
Isaac Testimony is a Full-Stack Web Developer and final-year Civil Engineering student. He builds websites and web applications for businesses and founders worldwide. He operates under the BlueStark brand. His engineering background means he approaches every project with structure, planning, and first-principles thinking — not guesswork.

He personally handles everything on every project: architecture, frontend, backend, and deployment. No subcontractors. No handoffs. One person, full accountability.

## SERVICES
1. Business Websites — clean, fast, SEO-optimized websites for small and medium businesses that need a proper web presence.
2. Landing Pages — high-converting single-page sites built to capture leads and drive action.
3. E-commerce Websites — online stores with smooth product browsing, cart, and checkout flows.
4. Web Applications — custom apps built with React and Next.js for businesses that need functionality beyond a standard website.
5. Website Redesigns — taking slow, outdated, or broken websites and rebuilding them properly.
6. SEO Optimization — technical SEO, fast load times, structured markup, and Google-ready architecture.
7. WhatsApp & Lead Generation Integration — building sites with WhatsApp CTAs, lead capture forms, and conversion-focused flows.

## PRICING
- Landing page: from $150
- Business website (up to 5 pages): from $300
- E-commerce website: from $600
- Web application: quoted per project based on scope
- Website redesign: from $250
- Payment structure: 50% upfront, 50% on delivery
- No hidden fees. Flat-fee pricing only. The quote given is the final price.
- Isaac does not charge hourly.

## TIMELINES
- Landing page: 3–5 days
- Business website: 1–2 weeks
- E-commerce site: 2–3 weeks
- Web application: scoped per project, timeline agreed before starting
- Isaac gives a clear timeline before every project starts and sticks to it.

## PROCESS
1. Discovery — Isaac learns the business, goals, and requirements before writing any code.
2. Design & Wireframe — layout and user flow mapped out, reviewed and approved by the client.
3. Build & Test — frontend and backend built simultaneously with testing throughout.
4. Launch & Handover — deployed to live, full documentation provided, client trained on any CMS if applicable.

## REVISIONS & SUPPORT
- 2 rounds of revisions included in every project
- 2 weeks of free post-launch support included
- Monthly maintenance packages available after that
- Additional revisions beyond the 2 included rounds are available at a flat fee

## TECH STACK
Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML, CSS, JavaScript
Backend: Node.js, Express
Database: PostgreSQL, MongoDB, Supabase, Firebase
Tools: Git, GitHub, Figma, VS Code, Cursor
Deployment: Vercel, Netlify

## MARKETS & AVAILABILITY
Isaac works with clients worldwide — no geographic restriction. He has worked with businesses across Nigeria, the UK, the Middle East, and beyond. He is currently available for new projects.

## ABOUT THE CIVIL ENGINEERING BACKGROUND
Isaac is a final-year Civil Engineering student. This is not unrelated to his web work — it directly shapes how he builds. Engineering teaches systems thinking, planning under constraints, and building things that hold up under pressure. He applies the same discipline to code: plan first, build right, test thoroughly.

## WHAT MAKES ISAAC DIFFERENT
- He writes every line of code himself — no templates, no page builders, no outsourcing
- Flat-fee pricing — clients always know the full cost upfront
- Engineering mindset — structured, planned, reliable
- Direct communication — one person to talk to from start to finish
- Fast delivery without cutting corners
- He has experience working across multiple industries and markets worldwide

## COMMON CLIENT SITUATIONS ISAAC HANDLES
- Businesses with no website currently losing customers to competitors
- Founders with a clear idea who can't find a developer who actually gets it
- Businesses burned by previous developers who disappeared or overcharged
- DIY websites on Wix or similar that look unprofessional and aren't converting
- Slow or broken websites that are damaging the brand
- Businesses being quoted thousands by agencies for simple sites

## CONTACT & HIRING
If anyone wants to start a project, get a quote, ask about availability, or just have a conversation — direct them to WhatsApp: https://wa.link/0cit50

## RESPONSE RULES
- Always answer in friendly, plain English — not corporate speak
- Keep answers focused and scannable — use short paragraphs
- Never make up information not listed here
- If asked something not covered here, say: 'That\'s a great question — I don\'t have that detail here, but you can ask Isaac directly on WhatsApp and he\'ll get back to you fast.'
- If someone seems ready to hire or start a project, always end with the WhatsApp link
- Never mention competitors by name
- Never discuss Isaac's personal life beyond what's listed here`
const formatMessageText = (text: string, isUser: boolean) => {
  if (!text) return null;

  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    const tokenRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g;
    const lineParts = line.split(tokenRegex);
    const parts: React.ReactNode[] = [];
    
    const formatBoldAndText = (str: string, keyPrefix: string) => {
      const boldParts = str.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={`${keyPrefix}-bold-${idx}`} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    lineParts.forEach((part, idx) => {
      if (!part) return;
      
      const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (mdLinkMatch) {
        parts.push(
          <a
            key={`link-${idx}`}
            href={mdLinkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isUser ? 'text-white underline font-semibold' : 'text-blue-400 hover:text-blue-300 underline font-medium'
            } transition-colors inline-flex items-center gap-0.5`}
          >
            {mdLinkMatch[1]}
            <span className="text-[10px]">↗</span>
          </a>
        );
        return;
      }
      
      const rawUrlMatch = part.match(/^https?:\/\/[^\s]+$/);
      if (rawUrlMatch) {
        parts.push(
          <a
            key={`url-${idx}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isUser ? 'text-white underline font-semibold' : 'text-blue-400 hover:text-blue-300 underline font-medium'
            } transition-colors inline-flex items-center gap-0.5`}
          >
            {part}
            <span className="text-[10px]">↗</span>
          </a>
        );
        return;
      }
      
      parts.push(...formatBoldAndText(part, `text-${idx}`));
    });

    return (
      <span key={`line-${lineIndex}`} className="block min-h-[1rem]">
        {parts.length > 0 ? parts : "\u00A0"}
      </span>
    );
  });
};

const getLocalResponse = (text: string): string => {
  const query = text.toLowerCase();
  
  if (query.includes('price') || query.includes('cost') || query.includes('charge') || query.includes('rate') || query.includes('fee') || query.includes('dollar') || query.includes('budget') || query.includes('quote') || query.includes('how much') || query.includes('pricing')) {
    return `Isaac offers transparent, flat-fee pricing based on the scope of work. All engagements require a 50% upfront payment, with the remaining 50% due upon project completion:

• **Landing Page**: From $150 (3–5 days timeline)
• **Business Website** (up to 5 pages): From $300 (1–2 weeks timeline)
• **E-commerce Website**: From $600 (2–3 weeks timeline)
• **Custom Web Application**: Custom quote based on technical scope
• **Website Redesign**: From $250

To receive a detailed quote tailored to your business, please initiate a request via [WhatsApp](https://wa.link/0cit50) or email at **isaactestimony.dev@gmail.com**.`;
  }
  
  if (query.includes('service') || query.includes('offer') || query.includes('do') || query.includes('build') || query.includes('make') || query.includes('create') || query.includes('develop') || query.includes('work') || query.includes('capable') || query.includes('skills') || query.includes('specialize')) {
    return `Isaac operates under the **BlueStark** brand and specializes in the following professional web development services:

1. **Business Websites** – Modern, responsive, and SEO-optimized sites designed to build credible web presence.
2. **Landing Pages** – High-converting single-page experiences built to capture leads.
3. **E-commerce Stores** – Fully functional storefronts with smooth checkout and payment flows.
4. **Web Applications** – Custom React/Next.js dynamic applications with secure backend logic.
5. **Website Redesigns** – Complete overhaul and engineering rebuild of slow or outdated sites.
6. **SEO & Performance Optimization** – Core Web Vitals optimization, speed enhancements, and structured metadata.

Let's discuss your requirements. You can connect with Isaac on [WhatsApp](https://wa.link/0cit50) or email **isaactestimony.dev@gmail.com** to start the conversation.`;
  }
  
  if (query.includes('time') || query.includes('timeline') || query.includes('duration') || query.includes('long') || query.includes('days') || query.includes('weeks') || query.includes('schedule') || query.includes('fast') || query.includes('quick')) {
    return `Project timelines are defined during the discovery phase and strictly adhered to:

• **Landing Pages**: Completed within 3–5 business days.
• **Business Websites**: Completed within 1–2 business weeks.
• **E-commerce Stores**: Completed within 2–3 business weeks.
• **Web Applications**: Scoped and scheduled on a per-project basis.

*Note: Each project includes 2 complete rounds of revisions and 2 weeks of dedicated post-launch support to ensure smooth transition.*

Please connect on [WhatsApp](https://wa.link/0cit50) to discuss scheduling.`;
  }
  
  if (query.includes('process') || query.includes('step') || query.includes('stage') || query.includes('method') || query.includes('how do you') || query.includes('workflow')) {
    return `Isaac follows a structured, engineering-led development process to ensure clarity and success:

1. **Discovery** – We analyze your business goals, target audience, and precise system parameters.
2. **Design & Wireframe** – We map the user experience, architecture, and layout for your explicit review and sign-off.
3. **Build & Test** – The custom frontend and backend are coded and rigorously tested for performance and security.
4. **Launch & Handover** – We deploy your live project to Vercel/Netlify, set up domains, and hand over documentation.

Ready to begin? Message Isaac directly on [WhatsApp](https://wa.link/0cit50).`;
  }
  
  if (query.includes('stack') || query.includes('tech') || query.includes('language') || query.includes('framework') || query.includes('code') || query.includes('react') || query.includes('next') || query.includes('typescript') || query.includes('tailwind') || query.includes('node') || query.includes('database') || query.includes('postgres') || query.includes('supabase')) {
    return `Isaac builds scalable and modern web solutions utilizing a robust, industry-standard stack:

• **Frontend Technologies**: React, Next.js, TypeScript, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3.
• **Backend & Databases**: Node.js, Express, PostgreSQL, MongoDB, Supabase, Firebase.
• **Infrastructure & Deployment**: Vercel, Netlify.
• **Engineering Tools**: Git, GitHub, Figma, VS Code.

No bloated page builders or templates are used; every line of code is custom-written. Contact Isaac on [WhatsApp](https://wa.link/0cit50) for architectural inquiries.`;
  }
  
  if (query.includes('civil') || query.includes('engineering') || query.includes('student') || query.includes('university') || query.includes('degree') || query.includes('school') || query.includes('education')) {
    return `Isaac is a final-year Civil Engineering student. This background strongly influences his approach to software development: it instills rigorous systems thinking, structural planning, planning within tight constraints, and engineering products that withstand heavy stress. He applies these exact principles to code quality and app architecture.`;
  }
  
  if (query.includes('who is') || query.includes('about') || query.includes('isaac') || query.includes('testimony') || query.includes('brand') || query.includes('bluestark') || query.includes('location') || query.includes('where')) {
    return `Isaac Testimony is a professional Full-Stack Web Developer and Civil Engineering student building premium web applications under the **BlueStark** brand. 

He serves a global client base (spanning Nigeria, the UK, the Middle East, and beyond) and maintains direct, single-point accountability—meaning he personally writes every line of code without outsourcing.

To discuss collaboration opportunities, message him on [WhatsApp](https://wa.link/0cit50) or email **isaactestimony.dev@gmail.com**.`;
  }
  
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('call') || query.includes('talk') || query.includes('chat') || query.includes('whatsapp') || query.includes('message') || query.includes('reach')) {
    return `You can establish direct contact with Isaac through the following channels:

• **WhatsApp**: Click to connect on [WhatsApp](https://wa.link/0cit50)
• **Email**: **isaactestimony.dev@gmail.com**

For inquiries regarding active availability, pricing quotes, or architectural consultations, he typically responds within a few business hours.`;
  }
  
  if (query.includes('why') || query.includes('different') || query.includes('better') || query.includes('choose') || query.includes('special')) {
    return `Choosing Isaac (BlueStark) offers distinct structural advantages:

1. **End-to-End Execution**: He manages the entire development lifecycle himself—no subcontractors or hand-offs.
2. **Fixed-Fee Clarity**: All project quotes are flat fees with zero hidden charges. No billing by the hour.
3. **Engineering Discipline**: Development is structured, systematic, and thoroughly verified.
4. **Transparent Communication**: You communicate directly with the individual engineer writing your code.

Connect on [WhatsApp](https://wa.link/0cit50) to start your project.`;
  }
  
  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('sup') || query.includes('morning') || query.includes('afternoon') || query.includes('evening')) {
    return `Hello. I am Isaac's professional AI assistant. Please let me know how I can assist you today regarding services, pricing, project timelines, tech stack, or booking a consultation.`;
  }
  
  return `Thank you for your inquiry. To get a precise answer or initiate a project request, please contact Isaac directly on [WhatsApp](https://wa.link/0cit50) or via email at **isaactestimony.dev@gmail.com**. He will respond promptly to coordinate next steps.`;
};

export const FloatingWidgets = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Isaac's assistant. Ask me anything about his work, pricing, or how to get started." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showPop, setShowPop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!triggered && window.scrollY > 200) {
        triggered = true;
        setShowPop(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_CHATBOT_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
      const groqKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey && !groqKey) {
        throw new Error('no_key');
      }

      let reply = "";

      // Check if it's a Groq key
      if ((groqKey && groqKey.startsWith('gsk_')) || (apiKey && apiKey.startsWith('gsk_'))) {
        const activeGroqKey = (groqKey && groqKey.startsWith('gsk_')) ? groqKey : apiKey;
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${activeGroqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
              })),
              { role: "user", content: text }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`groq_error_${response.status}`);
        }

        const data = await response.json();
        reply = data.choices?.[0]?.message?.content || "";
      } else {
        // Use Gemini API
        const geminiHistory = [...messages, userMsg].map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents: geminiHistory
            })
          }
        );

        if (!response.ok) {
          const errBody = await response.text();
          console.error('Gemini API error:', response.status, errBody);
          throw new Error(`gemini_error_${response.status}`);
        }

        const data = await response.json();
        reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }

      if (!reply) {
        throw new Error('empty_reply');
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply.trim() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.warn('API chat failed, falling back to local database:', error.message);
      // Simulate a typing delay for realistic user experience
      await new Promise(resolve => setTimeout(resolve, 800));
      const reply = getLocalResponse(text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes widgetPop {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.25); }
          50%  { transform: scale(0.95); }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      {/* Fixed Container for multiple widgets */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        {/* AI Chatbot Trigger */}
        <motion.button
          onClick={() => setIsAiOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow duration-300"
          style={{
            display: isAiOpen ? 'none' : 'flex',
            animation: showPop ? 'widgetPop 0.5s ease forwards' : undefined
          }}
        >
          <Sparkles className="w-6 h-6 text-white" />
          
          {/* Default hover tooltip */}
          <span className={`absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg opacity-0 ${showTooltip ? '' : 'group-hover:opacity-100'} whitespace-nowrap pointer-events-none transition-opacity duration-300`}>
            Ask Portfolio AI
          </span>

          {/* Auto-popup tooltip on scroll */}
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                initial={{ opacity: 0, x: 10, y: "-50%" }}
                animate={{ opacity: 1, x: 0, y: "-50%" }}
                exit={{ opacity: 0, x: 10, y: "-50%" }}
                transition={{ duration: 0.5 }}
                className="absolute right-16 top-1/2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white text-xs font-mono rounded-full whitespace-nowrap pointer-events-none"
              >
                Need help? Ask me anything
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* AI Chat Window Mockup */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="fixed bottom-6 right-6 z-[110] w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-32px)] bg-slate-950/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Portfolio AI</h3>
                  <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  <div className={`border rounded-2xl p-3 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 border-blue-500 rounded-tr-sm text-white' 
                      : 'bg-slate-900 border-slate-800 rounded-tl-sm text-slate-200'
                  }`}>
                    <div className="text-sm leading-relaxed space-y-1">
                      {formatMessageText(msg.content, msg.role === 'user')}
                    </div>
                    {msg.id === '2' && (
                      <div className="mt-3 flex flex-col gap-2">
                        <button onClick={() => handleSend("I need a functional redesign")} className="text-left px-3 py-2 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs text-blue-400 font-mono rounded-lg transition-colors">
                          I need a functional redesign
                        </button>
                        <button onClick={() => handleSend("I need an SEO Audit")} className="text-left px-3 py-2 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs text-blue-400 font-mono rounded-lg transition-colors">
                          I need an SEO Audit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/30">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend(inputValue);
                  }}
                  placeholder="Ask me anything..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-mono text-center mt-3">
                AI can make mistakes. For official inquiries, please book a call.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
