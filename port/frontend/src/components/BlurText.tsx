import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'top':
        return { y: -50, opacity: 0, filter: 'blur(10px)' };
      case 'bottom':
        return { y: 50, opacity: 0, filter: 'blur(10px)' };
      case 'left':
        return { x: -50, opacity: 0, filter: 'blur(10px)' };
      case 'right':
        return { x: 50, opacity: 0, filter: 'blur(10px)' };
      default:
        return { y: -50, opacity: 0, filter: 'blur(10px)' };
    }
  };

  const getAnimatePosition = () => {
    return { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' };
  };

  const splitText = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <div className={`inline-block ${className}`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block"
          >
            {splitText.map((item, index) => (
              <motion.span
                key={index}
                initial={getInitialPosition()}
                animate={getAnimatePosition()}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                className="inline-block"
                style={{ marginRight: animateBy === 'words' ? '0.25em' : '0.05em' }}
                onAnimationComplete={() => {
                  if (index === splitText.length - 1 && onAnimationComplete) {
                    onAnimationComplete();
                  }
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlurText;
