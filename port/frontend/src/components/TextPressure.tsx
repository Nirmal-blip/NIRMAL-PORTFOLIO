import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextPressureProps {
  text: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor = '#ffffff',
  strokeColor = '#ff0000',
  minFontSize = 36,
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getFontVariation = () => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - 0.5, 2) + Math.pow(mousePosition.y - 0.5, 2)
    );
    
    const intensity = Math.max(0, 1 - distance * 2);
    
    return {
      fontSize: minFontSize + (intensity * 20),
      fontWeight: weight ? 400 + (intensity * 600) : 400,
      fontStyle: italic && intensity > 0.5 ? 'italic' : 'normal',
      fontStretch: width ? `${100 + intensity * 50}%` : '100%',
      opacity: alpha ? 0.3 + (intensity * 0.7) : 1,
      textShadow: stroke 
        ? `0 0 ${intensity * 10}px ${strokeColor}` 
        : 'none'
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${flex ? 'flex items-center justify-center' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '300px' }}
    >
      <motion.div
        style={{
          color: textColor,
          fontFamily: 'MetaRegular, Outfit, Inter, sans-serif',
          ...getFontVariation(),
          transition: 'all 0.3s ease-out'
        }}
        animate={isHovered ? {
          scale: 1.05,
          rotate: [0, 1, -1, 0]
        } : {
          scale: 1,
          rotate: 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default TextPressure;
