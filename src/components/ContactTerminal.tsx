import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// FORMSPREE CONFIGURATION
// TODO: Replace with your Formspree Form ID
const FORM_ID = "xwvnkvkg";

export function ContactTerminal() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [state, handleSubmit] = useForm(FORM_ID);

  // Success State: Clear form/Show success message
  if (state.succeeded) {
      return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
             {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                 <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-900/50 border border-green-500/30 rounded-3xl p-12 flex flex-col items-center text-center max-w-lg backdrop-blur-md"
                 >
                    <div className='w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400'>
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold font-header text-white mb-4">Transmission Received</h2>
                    <p className="text-slate-400">Your mission parameters have been securely uplinked to my device. I will analyze the data and initiate contact within 24 hours.</p>
                     <button 
                        onClick={() => window.location.reload()}
                        className="mt-8 text-sm text-slate-500 hover:text-white underline transition-colors"
                     >
                        Transmit another signal
                     </button>
                 </motion.div>
            </div>
        </section>
      );
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
            <h2 className="text-4xl font-bold font-header mb-2">Initialize Transmission_</h2>
            <p className="text-slate-400 font-mono text-sm">SECURE CHANNEL OPEN</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quick Signal - Left Side */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center items-start backdrop-blur-md relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <MessageCircle size={100} />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">Quick Signal</h3>
                <p className="text-slate-400 mb-8 max-w-sm">For immediate queries and rapid deployment. Direct uplink to my personal device.</p>
                
                <a 
                    href="https://wa.link/0cit50" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/btn relative w-full md:w-auto overflow-hidden rounded-xl bg-green-600 px-8 py-4 text-white font-bold transition-all hover:bg-green-500 shadow-lg shadow-green-900/20 active:scale-95 flex items-center gap-3 justify-center"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>INITIATE WHATSAPP</span>
                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover/btn:ring-white/40 animate-pulse" />
                </a>
            </motion.div>

            {/* Project Data - Right Side */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-8 md:p-12 relative"
            >
                <div className="absolute top-4 right-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-200">
                    <Terminal className="text-blue-500" />
                    Project Specification Protocol
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="text-xs font-mono text-slate-500 mb-1 block uppercase">Identifier (Name)</label>
                        <input 
                            id="name"
                            type="text" 
                            name="name"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] placeholder:text-slate-700"
                            placeholder="Enter Identity..."
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        {focusedField === 'name' && (
                            <span className="absolute top-0 right-0 text-[10px] text-blue-400 animate-pulse font-mono">Typing...</span>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-mono text-slate-500 mb-1 block uppercase">Contact Frequency (Email)</label>
                        <input 
                            id="email"
                            type="email" 
                            name="email"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] placeholder:text-slate-700"
                            placeholder="Enter Frequency Address..."
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                        {focusedField === 'email' && (
                            <span className="absolute top-0 right-0 text-[10px] text-blue-400 animate-pulse font-mono">Typing...</span>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-mono text-slate-500 mb-1 block uppercase">Resource Allocation (Budget)</label>
                        <select 
                            id="budget"
                            name="budget"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] appearance-none"
                            onFocus={() => setFocusedField('budget')}
                            onBlur={() => setFocusedField(null)}
                        >
                            <option value="" disabled selected>Select Range...</option>
                            <option value="$1k - $3k (MVP)">$1k - $3k (MVP)</option>
                            <option value="$3k - $8k (Growth)">$3k - $8k (Growth)</option>
                            <option value="$8k+ (Enterprise)">$8k+ (Enterprise)</option>
                        </select>
                        <ValidationError prefix="Budget" field="budget" errors={state.errors} className="text-red-500 text-xs mt-1" />
                         {focusedField === 'budget' && (
                            <span className="absolute top-0 right-0 text-[10px] text-blue-400 animate-pulse font-mono">Selecting...</span>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-mono text-slate-500 mb-1 block uppercase">Signal Data (Details)</label>
                        <textarea 
                            id="message"
                            name="message"
                            required
                            rows={4}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] placeholder:text-slate-700 resize-none"
                            placeholder="Describe mission parameters..."
                            onFocus={() => setFocusedField('details')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                         {focusedField === 'details' && (
                            <span className="absolute top-0 right-0 text-[10px] text-blue-400 animate-pulse font-mono">Typing...</span>
                        )}
                    </div>
                    
                    <div className='relative h-14'>
                        <AnimatePresence mode='wait'>
                            {!state.submitting && !state.errors && (
                                <motion.button 
                                    key="idle"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    type="submit"
                                    disabled={state.submitting}
                                    className="absolute inset-0 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                                >
                                    <span>TRANSMIT DATA</span>
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            )}

                            {state.submitting && (
                                <motion.button 
                                    key="sending"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    disabled
                                    className="absolute inset-0 w-full bg-blue-600/50 text-white/80 font-bold rounded-xl flex items-center justify-center gap-2 cursor-wait"
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
    </section>
  );
}
