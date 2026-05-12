import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Rocket, Code2 } from 'lucide-react';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  isOverlay?: boolean;
}

export function LeadForm({ isOpen, onClose, isOverlay = true }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-close overlay on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOverlay) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isOverlay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');
    const company = formData.get('company');
    const email = formData.get('email');
    const service = formData.get('service');
    const interests = formData.getAll('interests');
    const message = formData.get('message');
    
    const subject = `New Lead: ${name} from ${company}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\nInterests: ${interests.join(', ')}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:johntamangofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (isOverlay) {
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const formContent = (
    <div className={`relative w-full max-w-lg mx-auto ${isOverlay ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto shadow-2xl shadow-indigo-500/20' : 'pointer-events-auto'}`}>
      <div className="bg-surface/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-neon/20 blur-[100px] rounded-full pointer-events-none" />
        
        {isOverlay && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="text-accent" size={28} />
            <h2 className="text-3xl font-display font-bold text-white">Automate Let's Talk</h2>
          </div>
          <p className="text-white/60 mb-6 font-sans">
            Ready to scale your business with AI workflows and a high-converting website? Get a free audit.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-white/50 font-bold">Name</label>
                  <input name="name" required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-white/50 font-bold">Company</label>
                  <input name="company" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Acme Corp" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-white/50 font-bold">Email</label>
                <input name="email" required type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-white/50 font-bold">What Service</label>
                <select name="service" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option>AI Automations</option>
                  <option>Website Design</option>
                  <option>Both</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/50 font-bold">What do you want to automate/improve? (Select multiple)</label>
                <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="interests" value="Leads Gen" className="accent-accent w-4 h-4 rounded border-white/20 bg-black/50" /> Lead Generation</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="interests" value="Customer Support" className="accent-accent w-4 h-4 rounded border-white/20 bg-black/50" /> Customer Support</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="interests" value="Social Media" className="accent-accent w-4 h-4 rounded border-white/20 bg-black/50" /> Social Media</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="interests" value="Internal Workflow" className="accent-accent w-4 h-4 rounded border-white/20 bg-black/50" /> Internal Workflow</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="interests" value="Other" className="accent-accent w-4 h-4 rounded border-white/20 bg-black/50" /> Other</label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-white/50 font-bold">Message</label>
                <textarea name="message" required rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button type="submit" className="w-full group bg-white text-black hover:bg-accent hover:text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-4 text-sm tracking-wide uppercase">
                <span>Submit Requirements</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                <Rocket size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">System Initiated</h3>
              <p className="text-white/60">We'll analyze your workflows and reach out within 24 hours.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  if (isOverlay) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-base/80 backdrop-blur-sm pointer-events-auto"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {formContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="w-full pb-20">
      {formContent}
    </div>
  );
}
