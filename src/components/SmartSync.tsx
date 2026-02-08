import { motion } from 'framer-motion';
import { type FormEvent, useState } from 'react';
import { Calendar, Hash, Send, User } from 'lucide-react';

export const SmartSync = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger 1: WhatsApp API
    const message = `New Meeting Request: ${formData.name} for ${formData.project} on ${formData.date}`;
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(message)}`;
    
    // Trigger 2: EmailJS Simulation
    console.log("EmailJS Simulation: Sending confirmation to user and notification to owner...");
    console.log("Data:", formData);

    // Open WhatsApp after a short delay to simulate processing
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);
        setFormData({ name: '', project: '', date: '' });
        alert("System initialized. Redirecting to secure channel...");
    }, 1500);
  };

  return (
    <section className="py-24 px-4 flex justify-center items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-slate-950">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg relative z-10 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-900/10"
        >
            <div className="space-y-2 mb-8 text-center">
                 <h2 className="text-2xl font-bold font-header tracking-tight">Initialize Collaboration</h2>
                 <p className="text-slate-400 text-sm">Sync with the engineering core.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-400 ml-1">01 // IDENTIFIER</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <input 
                            type="text" 
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-400 ml-1">02 // PROTOCOL TYPE</label>
                    <div className="relative group">
                         <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <input 
                            type="text" 
                            required
                            placeholder="Project Type (e.g. Web App, System Audit)"
                            value={formData.project}
                            onChange={e => setFormData({...formData, project: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-400 ml-1">03 // SYNC DATE</label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                        <input 
                            type="date" 
                            required
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 [color-scheme:dark]"
                        />
                    </div>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="animate-pulse">ESTABLISHING LINK...</span>
                    ) : (
                        <>
                            <span>EXECUTE</span>
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    </section>
  );
};
