import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Zap, Send, Terminal, AlertCircle, CheckCircle2, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CalendlyWidget } from '../components/CalendlyWidget';

const FORM_ID = "xwvnkvkg";

const budgetOptions = [
  { id: 'under-500', label: 'Under $500' },
  { id: '500-1500', label: '$500–$1,500' },
  { id: '1500-3000', label: '$1,500–$3,000' },
  { id: '3000-plus', label: '$3,000+' }
];

export const ContactPage = () => {
  const [selectedBudget, setSelectedBudget] = useState('500-1500');
  const [state, handleSubmit] = useForm(FORM_ID);
  
  if (state.succeeded) {
      return (
        <section className="py-32 bg-slate-950 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
             {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
                 <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-900/50 border border-green-500/30 rounded-3xl p-12 flex flex-col items-center text-center max-w-lg backdrop-blur-md"
                 >
                    <div className='w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400'>
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold font-header text-white mb-4">Transmission Received</h2>
                    <p className="text-slate-400">Your mission parameters have been securely uplinked. I will analyze the data and initiate contact within 24 hours.</p>
                     <button 
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 border border-slate-700 rounded-full text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                     >
                        Transmit another signal
                     </button>
                 </motion.div>
            </div>
        </section>
      );
  }

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden min-h-screen">
        {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-header tracking-tight text-white mb-6">
               Let's Build with BlueStark.
            </h2>
             <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
               Ready to scale? Pitch your project directly to our lead engineer, Isaac Testimony.
             </p>
        </motion.div>

        <div className="max-w-6xl mx-auto bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-8 md:p-14 backdrop-blur-sm relative overflow-hidden">
             
             {/* Inner Glow */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 relative z-10">
                
                {/* Left Side (Context) */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2 flex flex-col justify-center"
                >
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8 w-fit">
                      <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-blue-300 font-mono text-sm tracking-widest uppercase">
                        I typically respond within 24 hours.
                      </span>
                  </div>

                  <h3 className="text-3xl font-bold font-header text-white mb-6">
                      Direct Output Channel
                  </h3>
                  
                  <p className="text-slate-400 text-lg leading-relaxed font-light mb-12">
                     Whether you have a fully scoped technical brief or just a concept that needs validation, let's discuss how we can engineer it into reality.
                  </p>

                  <div className="flex flex-col gap-8">
                      <a href="mailto:isaactestimony.dev@gmail.com" className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                              <Mail size={20} />
                          </div>
                          <div>
                              <p className="text-sm font-mono text-slate-500 mb-1">Email Connection</p>
                              <p className="text-white font-medium">isaactestimony.dev@gmail.com</p>
                          </div>
                      </a>

                      <div>
                          <h4 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Digital Presence</h4>
                          <div className="grid grid-cols-2 gap-4">
                              <a href="https://github.com/Testy123ll" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-600 transition-all duration-300">
                                  <Github size={18} className="text-slate-400 group-hover:text-white" />
                                  <span className="text-sm text-slate-300 group-hover:text-white font-mono">GitHub</span>
                              </a>
                              <a href="https://linkedin.com/in/isaac-testimony-b63243230" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-600/50 transition-all duration-300">
                                  <Linkedin size={18} className="text-slate-400 group-hover:text-blue-400" />
                                  <span className="text-sm text-slate-300 group-hover:text-white font-mono">LinkedIn</span>
                              </a>
                              <a href="https://x.com/bluestark01" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition-all duration-300">
                                  <Twitter size={18} className="text-slate-400 group-hover:text-sky-400" />
                                  <span className="text-sm text-slate-300 group-hover:text-white font-mono">Twitter</span>
                              </a>
                              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-pink-500/50 transition-all duration-300">
                                  <Instagram size={18} className="text-slate-400 group-hover:text-pink-400" />
                                  <span className="text-sm text-slate-300 group-hover:text-white font-mono">Instagram</span>
                              </a>
                          </div>
                      </div>
                  </div>
                </motion.div>

                {/* Right Side (Form) */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-3 bg-slate-950 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-xl shadow-slate-950/50"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Hidden budget input to pass select value to formspree */}
                        <input type="hidden" name="budget" value={budgetOptions.find(b => b.id === selectedBudget)?.label} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-mono text-slate-400 ml-1">Full Name</label>
                                <input 
                                   id="name"
                                   type="text" 
                                   name="name"
                                   placeholder="John Doe"
                                   className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                   required
                                />
                                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-mono text-slate-400 ml-1">Email Address</label>
                                <input 
                                   id="email"
                                   type="email" 
                                   name="email"
                                   placeholder="john@startup.com"
                                   className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                   required
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-mono text-slate-400 ml-1">Expected Budget</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {budgetOptions.map(option => (
                                    <button
                                      key={option.id}
                                      type="button"
                                      onClick={() => setSelectedBudget(option.id)}
                                      className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                                          selectedBudget === option.id 
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' 
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                                      }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-mono text-slate-400 ml-1">Project Details</label>
                            <textarea 
                               id="message"
                               name="message"
                               placeholder="Tell me about functionality, timeline, specific APIs needed..."
                               rows={5}
                               className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                               required
                            ></textarea>
                            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className='relative h-14'>
                          <AnimatePresence mode='wait'>
                              {!state.submitting && !state.errors && (
                                <motion.button 
                                    key="idle"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    type="submit"
                                    disabled={state.submitting}
                                    className="absolute inset-0 w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <span>🚀 Send Message</span>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                              )}
                              
                              {state.submitting && (
                                <motion.button 
                                    key="sending"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    disabled
                                    className="absolute inset-0 w-full bg-blue-600/50 text-white/80 font-bold rounded-xl flex items-center justify-center gap-2 cursor-wait border border-blue-500"
                                >
                                    <Terminal className="w-4 h-4 animate-spin" />
                                    <span className="animate-pulse">TRANSMITTING...</span>
                                </motion.button>
                            )}
                            
                            {state.errors && (
                                <motion.button 
                                    key="error"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    type="submit"
                                    className="absolute inset-0 w-full bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500"
                                >
                                    <AlertCircle className="w-5 h-5" />
                                    <span>TRANSMISSION FAILED (RETRY)</span>
                                </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-6xl mx-auto mt-16"
        >
            <CalendlyWidget />
        </motion.div>
      </div>
    </section>
  );
};
