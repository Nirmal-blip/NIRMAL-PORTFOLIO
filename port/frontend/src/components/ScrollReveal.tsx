import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  baseOpacity = 0,
  enableBlur = true,
  baseRotation = 5,
  blurStrength = 10,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [baseOpacity, 1, baseOpacity]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [baseRotation, 0, -baseRotation]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [blurStrength, 0, blurStrength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        rotate,
        filter: enableBlur ? `blur(${blur}px)` : 'none',
        scale
      }}
      initial={{ opacity: baseOpacity, y: 100, rotate: baseRotation }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', scale: 1 }
          : { opacity: baseOpacity, y: 100, rotate: baseRotation, filter: enableBlur ? `blur(${blurStrength}px)` : 'none', scale: 0.8 }
      }
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
