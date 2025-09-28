import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!disabled) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disabled]);

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="relative overflow-hidden"
        style={{
          background: disabled 
            ? 'linear-gradient(90deg, #8eecf5, #ffffff)' 
            : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #8eecf5, #ffffff)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%'
        }}
        animate={disabled ? {} : {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {text}
      </motion.div>
      
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </div>
  );
};

export default ShinyText;
