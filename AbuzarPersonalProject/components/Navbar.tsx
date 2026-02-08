
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Dynamic stretch based on velocity
  const stretch = useTransform(scrollVelocity, [-2000, 2000], [0.8, 1.2]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  const links = ["Experience", "System", "Archive", "Connect"];

  return (
    <motion.nav 
      style={{ opacity, scaleY: stretch }}
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 w-full max-w-4xl px-6`}
    >
      <div className={`
        relative flex items-center justify-between px-8 py-3 rounded-3xl 
        border border-white/10 backdrop-blur-3xl transition-all duration-500
        ${isScrolled ? 'bg-surface/60 shadow-2xl scale-95' : 'bg-transparent'}
      `}>
        {/* Brand */}
        <div className="flex items-center gap-3 interactive group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
            <Zap className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="text-sm font-black tracking-[0.3em] font-display">AETHERIA</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="interactive px-5 py-2 bg-white text-dark text-[10px] font-black uppercase tracking-widest rounded-full"
        >
          Initialize
        </motion.button>
      </div>
    </motion.nav>
  );
};
