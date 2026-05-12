import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { CoreNode, BackgroundParticles } from './components/Scene3D';
import { AnimatedWorkflows, AnimatedNumber } from './components/AnimatedVisuals';
import { LeadForm } from './components/LeadForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChevronRight, ArrowRight, Code, Zap, BarChart, MessageSquare, Mail, Users, Calendar, Bot, FileText, CheckCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    // Show form overlay soon after they enter
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-base min-h-screen text-white font-sans selection:bg-primary/30">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <BackgroundParticles />
          <CoreNode />
        </Canvas>
      </div>

      <LeadForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isOverlay={true} />
      <WhatsAppButton />

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full p-6 mix-blend-difference z-40 flex justify-between items-center bg-base/10 backdrop-blur-md border-b border-white/5">
          <div className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-neon rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            SYNTH<span className="text-white/50">FLOW</span>
          </div>
          <button 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              setIsModalOpen(false); // Just in case it's inside another overlay, but this is header. Let's just scroll.
            }}
            className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-semibold uppercase tracking-widest"
          >
            Let's Connect
          </button>
        </nav>

        {/* Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity }}
          className="h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-mono text-white/70">AI Automation Agency</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] sm:text-[8vw] md:text-[6vw] font-display font-bold leading-[0.85] tracking-tighter text-glow"
          >
            AUTOMATE <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-neon to-accent">
              EVERYTHING.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl mt-8 text-lg md:text-xl text-white/60 font-light"
          >
            We help ambitious businesses scale by replacing manual workflows with intelligent AI automations and designing high-converting, immersive website experiences.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-12 group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-neon translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              Let's Connect
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.section>

        {/* Stats Section with Overlay effect */}
        <section className="relative z-20 py-24 bg-surface rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { label: "Hours Saved", value: 500, suffix: "+" },
              { label: "Workflows Built", value: 120, suffix: "" },
              { label: "Conversion Lift", value: 300, suffix: "%" },
              { label: "ROI Increased", value: 10, suffix: "x" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-6xl font-display font-bold text-accent">
                  <AnimatedNumber value={stat.value} />{stat.suffix}
                </div>
                <div className="text-sm uppercase tracking-widest text-white/50 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services / Visuals Section */}
        <section className="relative z-20 py-32 bg-base">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tight">
                  <span className="text-white/30">01.</span><br />
                  AI-Powered<br />Workflows
                </h2>
                <p className="text-xl text-white/60">
                  Stop doing repetitive tasks. We design intelligent systems that connect your tools, process data with LLMs, and execute actions autonomously holding the highest precision.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "Custom GPT Integrations", 
                    "CRM Automation (HubSpot, Salesforce)", 
                    "Automated Lead Gen & Outreach", 
                    "Client Onboarding Portals"
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-lg"
                    >
                      <Zap className="text-neon" size={20} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated Component instead of Image */}
              <div className="relative">
                <AnimatedWorkflows />
              </div>
            </div>
          </div>
        </section>

        {/* AI Use Cases Grid */}
        <section className="relative z-20 py-32 bg-surface/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4 text-xs font-bold tracking-widest uppercase"
              >
                Capabilities
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                Automations that <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">drive revenue</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                We deploy advanced LLMs and API integrations to handle your most time-consuming tasks exactly how a human would—just infinitely faster.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <MessageSquare size={24} />, title: "Social Media Autopilot", desc: "AI agents that instantly reply to Instagram/Facebook DMs, engage with comments, and drive followers directly to your sales funnels." },
                { icon: <Mail size={24} />, title: "Intelligent Inboxes", desc: "Stop drafting follow-ups. Our systems read inbound emails, categorize intent, and draft hyper-personalized replies or trigger nurture sequences." },
                { icon: <Users size={24} />, title: "24/7 Lead Generation", desc: "Deploy conversational AI that acts as your SDR—engaging website visitors, qualifying leads, and booking meetings." },
                { icon: <RefreshCw size={24} />, title: "CRM Synchronization", desc: "No more manual data entry. We connect your apps so leads flow perfectly into HubSpot/Salesforce and databases update in real-time." },
                { icon: <FileText size={24} />, title: "Document Processing", desc: "Automate invoice, receipt, and contract handling. Extract key data from PDFs instantly and route it to your accounting software." },
                { icon: <Bot size={24} />, title: "AI Voice Receptionist", desc: "Never miss a call. Custom AI voice agents that answer phones, schedule appointments, and provide customer support over the phone." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Section */}
        <section className="relative z-30 py-32 bg-surface/50 border-y border-white/5 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
              <div className="order-2 lg:order-1 relative h-[500px] w-full border border-white/10 rounded-3xl bg-black/50 overflow-hidden flex flex-col">
                {/* Fake IDE Header */}
                <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 text-xs font-mono text-white/40">App.tsx — High-Performance UI</div>
                </div>
                {/* Code typing simulation */}
                <div className="p-6 font-mono text-sm leading-loose text-white/70">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "auto" }}
                    transition={{ duration: 3 }}
                    className="overflow-hidden whitespace-pre"
                  >
                    <span className="text-accent">import</span> {'{ motion }'} <span className="text-accent">from</span> <span className="text-neon">'motion/react'</span>;<br/>
                    <span className="text-accent">import</span> {'{ Conversion }'} <span className="text-accent">from</span> <span className="text-neon">'./engine'</span>;<br/>
                    <br/>
                    <span className="text-primary">export default function</span> <span className="text-yellow-200">Site</span>() {'{'}<br/>
                    {'  '}return (<br/>
                    {'    '}&lt;<span className="text-neon">motion.div</span><br/>
                    {'      '}initial={'{'}{'{ opacity: 0 }'}{'}'}<br/>
                    {'      '}animate={'{'}{'{ opacity: 1, scale: 1.5 }'}{'}'}<br/>
                    {'    '}&gt;<br/>
                    {'      '}&lt;<span className="text-yellow-200">Conversion</span> <i>rate</i>="<span className="text-green-400">max</span>" /&gt;<br/>
                    {'    '}&lt;/<span className="text-neon">motion.div</span>&gt;<br/>
                    {'  '});<br/>
                    {'}'}
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-white/80 inline-block align-middle ml-1 mt-1"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                <h2 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tight">
                  <span className="text-white/30">02.</span><br />
                  Immersive<br />Web Design
                </h2>
                <p className="text-xl text-white/60">
                  We don't build templates. We craft award-winning digital experiences that captivate your audience, combining cutting-edge 3D visuals, motion design, and conversion-focused layouts.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-lg"><Code className="text-accent" size={20} /> Next.js & React Native applications</div>
                  <div className="flex items-center gap-3 text-lg"><BarChart className="text-accent" size={20} /> Conversion Rate Optimization</div>
                  <div className="flex items-center gap-3 text-lg"><Zap className="text-accent" size={20} /> Advanced WebGL / 3D Experiences</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="relative z-30 py-32 bg-base">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                  How we run <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-accent">the operation</span>
                </h2>
                <p className="text-white/60 text-lg mb-10">We don't just hand you a software tool. We audit your business, engineer custom ecosystems, and ensure you actually see the ROI.</p>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Process Audit & Strategy", desc: "We map out your current workflows, identify bottlenecks, and pinpoint exactly where AI can save hours and generate revenue." },
                    { step: "02", title: "Build & Automate", desc: "Our engineers connect your APIs, train custom LLMs, and build the invisible logic that runs your business in the background." },
                    { step: "03", title: "Deploy & Optimize", desc: "We launch the systems, train your team on how to manage them, and continuously refine the prompts for peak performance." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="text-2xl font-mono font-bold text-white/20 pt-1">{item.step}</div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-white/60">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-[600px] rounded-3xl border border-white/10 bg-surface/50 p-8 overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-base to-base" />
                
                {/* Floating Process UI elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full max-w-sm bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-4 relative z-10 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle size={20} /></div>
                    <div>
                      <div className="font-bold">Lead Qualified</div>
                      <div className="text-xs text-white/40">via Instagram DM AI</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-500" />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="w-full max-w-sm bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative z-10 shadow-2xl ml-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Calendar size={20} /></div>
                    <div>
                      <div className="font-bold">Meeting Booked</div>
                      <div className="text-xs text-white/40">Synced to Google Calendar & CRM</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="h-full bg-accent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA / Form Section */}
        <section id="contact" className="relative z-40 py-32 bg-base overflow-hidden">
          {/* Giant background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none">
            READY TO SCALE?
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-12">
              Stop settling for manual work.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Let's build your machine.
              </span>
            </h2>
            <div className="w-full">
              <LeadForm isOpen={true} onClose={() => {}} isOverlay={false} />
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-white/10 bg-black text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center px-12">
          <div>© {new Date().getFullYear()} SynthFlow Agency. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Dribbble</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
