
import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Needle = ({ x, y, mouseX, mouseY }: any) => {
  const angle = useMotionValue(0);
  const springAngle = useSpring(angle, { stiffness: 100, damping: 10 });
  const opacity = useMotionValue(0.1);

  useEffect(() => {
    const unsubscribe = mouseX.on("change", (latestX: number) => {
      const dx = latestX - (window.innerWidth * (x / 100));
      const dy = mouseY.get() - (window.innerHeight * (y / 100));
      const dist = Math.hypot(dx, dy);
      
      if (dist < 400) {
        const a = Math.atan2(dy, dx) * (180 / Math.PI);
        angle.set(a);
        opacity.set(0.4 - (dist / 1000));
      } else {
        opacity.set(0.05);
      }
    });
    return () => unsubscribe();
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      className="absolute w-8 h-[1px] bg-white rounded-full origin-left"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        rotate: springAngle,
        opacity
      }}
    />
  );
};

export const Background3D: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const needles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        items.push({ x: i * 5 + 2.5, y: j * 5 + 2.5 });
      }
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none bg-dark z-0 overflow-hidden">
      {/* Vector Field */}
      <div className="absolute inset-0">
        {needles.map((n, i) => (
          <Needle key={i} x={n.x} y={n.y} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Atmospheric Glow */}
      <motion.div 
        className="absolute w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[200px]"
        style={{ 
          x: useSpring(useTransform(mouseX, [0, 2000], [-200, 200])),
          y: useSpring(useTransform(mouseY, [0, 1000], [-200, 200])),
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </div>
  );
};
