import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last';
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: any;
  rotationInterval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  staggerFrom = 'first',
  initial = { y: '100%' },
  animate = { y: 0 },
  exit = { y: '-120%' },
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        className={`inline-block ${splitLevelClassName}`}
        initial={
          staggerFrom === 'first'
            ? initial
            : { ...initial, delay: index * staggerDuration }
        }
        animate={animate}
        exit={exit}
        transition={{
          ...transition,
          delay:
            staggerFrom === 'first'
              ? index * staggerDuration
              : (texts[currentIndex].length - index) * staggerDuration
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div className={`relative overflow-hidden ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {splitText(texts[currentIndex])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
