import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Database, Workflow, Globe, Sparkles } from 'lucide-react';

export function AnimatedWorkflows() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative w-full h-[600px] flex justify-center items-center overflow-hidden bg-surface/50 border border-white/5 rounded-3xl p-8 perspective-1000">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Center AI Core */}
      <motion.div 
        animate={{ 
          boxShadow: ['0 0 20px #6366f1, inset 0 0 20px #6366f1', '0 0 60px #a855f7, inset 0 0 60px #a855f7', '0 0 20px #6366f1, inset 0 0 20px #6366f1'] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl z-20 flex items-center justify-center relative"
      >
        <Sparkles className="text-white w-10 h-10" />
        
        {/* Pulsing ring */}
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 border border-primary rounded-full"
        />
      </motion.div>

      {/* Orbiting nodes */}
      <OrbitNode x="-150%" y="-100%" delay={0} icon={<Database />} label="Data Sync" />
      <OrbitNode x="150%" y="-80%" delay={1} icon={<Workflow />} label="Zapier Flow" />
      <OrbitNode x="-120%" y="120%" delay={2} icon={<Globe />} label="Web Scraping" />
      <OrbitNode x="140%" y="100%" delay={3} icon={<Database />} label="CRM Update" />

      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.line 
          x1="30%" y1="30%" x2="50%" y2="50%" stroke="url(#grad)" strokeWidth="2" strokeDasharray="5,5"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line 
          x1="70%" y1="30%" x2="50%" y2="50%" stroke="url(#grad)" strokeWidth="2" strokeDasharray="5,5"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line 
          x1="35%" y1="70%" x2="50%" y2="50%" stroke="url(#grad)" strokeWidth="2" strokeDasharray="5,5"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line 
          x1="65%" y1="70%" x2="50%" y2="50%" stroke="url(#grad)" strokeWidth="2" strokeDasharray="5,5"
          animate={{ strokeDashoffset: [-20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

function OrbitNode({ x, y, delay, icon, label }: { x: string, y: string, delay: number, icon: React.ReactNode, label: string }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x, y, opacity: 1 }}
      transition={{ duration: 2, delay, type: "spring", stiffness: 50 }}
      className="absolute flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full z-30"
    >
      <div className="text-accent">{icon}</div>
      <span className="text-sm font-mono text-white/80">{label}</span>
      
      {/* Activity indicator */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: delay + 0.5 }}
        className="w-2 h-2 rounded-full bg-accent"
      />
    </motion.div>
  );
}

// Number Counter effect
export function AnimatedNumber({ value }: { value: number }) {
  const [inView, setInView] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={nodeRef} className="font-display">0</span>;
}
