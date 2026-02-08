
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Globe, Zap, Box, Fingerprint, Code, Activity, Layers } from 'lucide-react';

const PortalCard = ({ title, icon, desc, specs, delay }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    // Set variables for the clip-path portal
    cardRef.current.style.setProperty('--mouse-x', `${px}px`);
    cardRef.current.style.setProperty('--mouse-y', `${py}px`);
    
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative h-[500px] rounded-[3rem] overflow-hidden bg-surface/40 border border-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-primary/50"
    >
      {/* Front Content: Dark Mode */}
      <div className="absolute inset-0 p-12 flex flex-col pointer-events-none">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform">
          {React.cloneElement(icon, { className: "w-8 h-8 text-primary" })}
        </div>
        <h3 className="text-4xl font-display font-black mb-6 tracking-tight">{title}</h3>
        <p className="text-white/40 text-lg leading-relaxed mb-auto">{desc}</p>
        <div className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">Security_Auth: Passed</div>
      </div>

      {/* Back Content: Portal Blueprint Reveal */}
      <div className="portal-mask absolute inset-0 bg-white text-dark p-12 flex flex-col shadow-2xl">
        {/* Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="bg-dark text-white px-3 py-1 text-[9px] font-black rounded font-mono">SYSTEM_OVERRIDE</span>
            <Layers className="text-primary w-6 h-6" />
          </div>
          
          <h3 className="text-3xl font-mono font-black mb-8 uppercase tracking-tighter">DATA_SCHEMATIC</h3>
          
          <div className="space-y-6 flex-grow">
            {specs.map((spec: any, i: number) => (
              <div key={i} className="border-b border-dark/10 pb-2">
                <div className="text-[9px] font-mono text-dark/40 uppercase mb-1">{spec.split(':')[0]}</div>
                <div className="text-lg font-black font-mono">{spec.split(':')[1]}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-1 flex-1 bg-dark/10 rounded-full overflow-hidden`}>
                <motion.div 
                  animate={{ height: ['0%', '100%', '0%'] }} 
                  transition={{ duration: 1 + i/4, repeat: Infinity }}
                  className="w-full bg-primary" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-9xl font-display font-black mb-10 leading-[0.8] tracking-tighter">
              MODULAR <br />
              <span className="text-primary italic">ORCHESTRATION.</span>
            </h2>
            <p className="text-white/30 text-xl font-medium max-w-xl border-l-2 border-primary/20 pl-8">
              Explore the technical foundation of our spectral architectures. Hover to pierce the digital veil.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <PortalCard 
            title="Neural UI"
            icon={<Fingerprint />}
            desc="Predictive logic layers that anticipate intent before execution."
            specs={["LATENCY: 0.02ms", "PRECISION: 99.4%", "NODES: 1,024"]}
            delay={0.1}
          />
          <PortalCard 
            title="Quantum Stack"
            icon={<Globe />}
            desc="Global distribution logic protected by post-quantum tunnels."
            specs={["UPTIME: 99.999%", "SECURITY: RSA-4096", "CDN: Edge-Native"]}
            delay={0.2}
          />
          <PortalCard 
            title="Atomic Design"
            icon={<Box />}
            desc="Visual systems built on mathematical constants and fluid dynamics."
            specs={["FPS: 144Hz", "RENDER: WebGL2", "SHADERS: PBR-Logic"]}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};
