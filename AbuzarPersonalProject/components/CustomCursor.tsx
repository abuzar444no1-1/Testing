
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springX = useSpring(mouseX, { damping: 40, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const hover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('button, a, .interactive'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', hover);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', hover);
    };
  }, []);

  return (
    <>
      {/* The Inversion Lens */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border-2 border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          rotate: isHovered ? 45 : 0
        }}
      />
      
      {/* Ghosting Trail (Subtle) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovered ? 0 : 1 }}
      />
    </>
  );
};
