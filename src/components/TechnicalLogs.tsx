import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Zap, ShieldCheck, Layers } from 'lucide-react';
import { useState } from 'react';

export function TechnicalLogs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6 max-w-5xl">
         <div className="mb-12 flex items-center gap-3">
            <h2 className="text-3xl font-bold font-header">Technical Logs_</h2>
            <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Featured Article Card */}
        <motion.div 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ y: -5 }}
            className="group cursor-pointer rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 border border-slate-800 p-8 md:p-12 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText size={200} />
            </div>

            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    FEATURED INTEL
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-blue-200 transition-colors">
                    The WordPress Trap: Why Custom Engineering Wins
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Many businesses choose WordPress for the low entry cost, only to pay double later in speed issues, security hacks, and plugin subscriptions. Custom architecture is an asset; templates are a liability.
                </p>

                <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                    READ TRANSMISSION <span className="text-xl">→</span>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-3xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                >
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h3 className="text-2xl font-bold mb-8 text-white pr-10">Transmission Decrypted: Custom vs. Template</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                            <Zap className="text-amber-500 mb-4" size={32} />
                            <h4 className="font-bold text-white mb-2">Speed Protocol</h4>
                            <p className="text-sm text-slate-400">Google punishes slow sites. Custom code loads in milliseconds, keeping bounce rates low and engagement high.</p>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                             <ShieldCheck className="text-green-500 mb-4" size={32} />
                             <h4 className="font-bold text-white mb-2">Security Core</h4>
                             <p className="text-sm text-slate-400">No plugins means no backdoors for hackers. A closed-circuit architecture that protects your data.</p>
                        </div>
                        
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                             <Layers className="text-blue-500 mb-4" size={32} />
                             <h4 className="font-bold text-white mb-2">Scalability</h4>
                             <p className="text-sm text-slate-400">You own the source code. No monthly platform fees, and we can add features instantly.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
}
