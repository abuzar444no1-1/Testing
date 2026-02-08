
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ChevronRight, Activity } from 'lucide-react';

const SpectralChar = ({ char, index, mouseX, mouseY }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const update = () => {
      const rect = document.getElementById(`char-${index}`)?.getBoundingClientRect();
      if (!rect) return;
      const dx = mouseX.get() - (rect.left + rect.width / 2);
      const dy = mouseY.get() - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      
      if (dist < 200) {
        const factor = (200 - dist) / 10;
        x.set((dx / dist) * -factor);
        y.set((dy / dist) * -factor);
      } else {
        x.set(0); y.set(0);
      }
    };
    const unsub = mouseX.on("change", update);
    return unsub;
  }, [index, mouseX, mouseY]);

  return (
    <motion.span
      id={`char-${index}`}
      className="inline-block relative spectral-text"
      initial={{ y: 100, opacity: 0, filter: 'blur(20px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: springX, y: springY }}
    >
      {/* Spectral Layers for Chromatic Aberration */}
      <span className="absolute inset-0 text-[#ff0000] mix-blend-screen opacity-0 group-hover:opacity-40 -translate-x-1" style={{ filter: 'blur(1px)' }}>{char}</span>
      <span className="absolute inset-0 text-[#00ff00] mix-blend-screen opacity-0 group-hover:opacity-40 translate-x-1" style={{ filter: 'blur(1px)' }}>{char}</span>
      <span className="relative z-10">{char === " " ? "\u00A0" : char}</span>
    </motion.span>
  );
};

export const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section 
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 text-center group">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12"
        >
          <Activity className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">Spectral_Mode_Engaged</span>
        </motion.div>

        <h1 className="text-8xl md:text-[18rem] font-display font-black leading-[0.7] tracking-tighter mb-12 select-none">
          <div className="flex justify-center flex-wrap">
            {"AETHERIA".split("").map((c, i) => <SpectralChar key={i} char={c} index={i} mouseX={mouseX} mouseY={mouseY} />)}
          </div>
          <div className="flex justify-center flex-wrap bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            {"GENESIS".split("").map((c, i) => <SpectralChar key={i+10} char={c} index={i+10} mouseX={mouseX} mouseY={mouseY} />)}
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto text-white/30 text-lg md:text-xl font-medium leading-relaxed mb-16 font-mono"
        >
          [LOG]: Orchestrating multi-dimensional digital experiences through phase-shifted design logic and spectral aesthetics.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="interactive relative px-14 py-6 bg-white text-dark rounded-[2rem] font-black tracking-widest uppercase text-xs overflow-hidden"
          >
            Phase_Into_System
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="interactive px-14 py-6 border border-white/10 rounded-[2rem] font-black tracking-widest uppercase text-xs backdrop-blur-md"
          >
            Access_Archive
          </motion.button>
        </div>
      </div>

      {/* Bottom Interface Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 flex justify-between items-end opacity-20 font-mono text-[8px] tracking-[0.5em] uppercase">
        <div className="flex flex-col gap-1">
          <span>Buffer: Optimized</span>
          <span>Packets: Flowing</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>Lat: 0.003ms</span>
          <span>Uptime: 100%</span>
        </div>
      </div>
    </section>
  );
};
