import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const FloatingWidgets = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! Welcome to BlueStark. I'm Isaac's virtual engineering assistant." },
    { id: '2', role: 'assistant', content: 'Are you looking for a website audit, custom web app development, or just have a general question about our tech stack?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let replyContent = "I'm a simulated assistant! To explore further, please book a call or use the contact form.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('audit') || lowerText.includes('seo') || lowerText.includes('speed')) {
        replyContent = "A technical SEO audit is the perfect starting point. I can analyze your Core Web Vitals, DOM bloat, and render-blocking scripts. Check out the 'Services' section or book a call!";
      } else if (lowerText.includes('redesign') || lowerText.includes('build') || lowerText.includes('custom')) {
        replyContent = "We specialize in high-performance custom architectures using React and Next.js. Engineered platforms convert vastly better than templates.";
      } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('budget')) {
        replyContent = "Project costs scale entirely on scope and functionality requirements. Use the main contact form to provide details and get a precise quote.";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: replyContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Fixed Container for multiple widgets */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        
        {/* WhatsApp Floating Button */}
        <motion.a
          href="https://wa.link/xb1rpa"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-shadow duration-300"
        >
          {/* Using a custom SVG for exact WhatsApp Icon if needed, or MessageCircle as fallback. We'll use a precise SVG path for WhatsApp */}
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.996 0A12.012 12.012 0 0 0 0 12.001c0 2.115.549 4.103 1.549 5.864L.014 23.992l6.27-1.646c1.728.904 3.712 1.411 5.712 1.411 6.613 0 11.996-5.385 11.996-12.011 0-6.626-5.383-12.011-12.011-12.011zm0 21.737c-1.785 0-3.526-.457-5.068-1.325l-3.628.952.966-3.535A9.973 9.973 0 0 1 2.02 12.001A9.986 9.986 0 0 1 11.996 2.019c5.509 0 9.998 4.49 9.998 9.982a9.988 9.988 0 0 1-9.998 9.982V21.77l-.004-.033zm5.488-7.51c-.301-.151-1.786-.883-2.062-.984-.277-.101-.48-.151-.68.151-.202.302-.781.984-.956 1.185-.176.202-.352.227-.654.076-1.558-.785-2.731-1.854-3.551-3.26-.176-.302.202-.279.742-1.353.076-.151.038-.279-.038-.43s-.68-1.636-.932-2.242c-.244-.589-.494-.509-.68-.519l-.58-.01c-.201 0-.528.076-.804.378-.276.302-1.055 1.033-1.055 2.52s1.08 2.923 1.231 3.125c.15.202 2.13 3.252 5.158 4.558 2.053.882 2.76.755 3.262.63.55-.137 1.786-.73 2.037-1.434.251-.704.251-1.309.176-1.435-.075-.126-.276-.201-.578-.352z"/>
          </svg>
          
          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-300">
            Chat on WhatsApp
          </span>
        </motion.a>

        {/* AI Chatbot Trigger */}
        <motion.button
          onClick={() => setIsAiOpen(true)}
          style={{ display: isAiOpen ? 'none' : 'flex' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow duration-300"
        >
          <Sparkles className="w-6 h-6 text-white" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-300">
            Ask BlueStark AI
          </span>
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
                  <h3 className="text-white font-medium text-sm">BlueStark AI</h3>
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
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.id === '2' && (
                      <div className="mt-3 flex flex-col gap-2">
                        <button onClick={() => handleSend("I need a functional redesign")} className="text-left px-3 py-2 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs text-blue-400 font-mono rounded-lg transition-colors">
                          🚀 I need a functional redesign
                        </button>
                        <button onClick={() => handleSend("I need an SEO Audit")} className="text-left px-3 py-2 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-xs text-blue-400 font-mono rounded-lg transition-colors">
                          🔍 I need an SEO Audit
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
