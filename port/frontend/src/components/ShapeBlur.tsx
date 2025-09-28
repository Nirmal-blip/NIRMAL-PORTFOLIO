import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShapeBlurProps {
  variation?: number;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
  className?: string;
}

const ShapeBlur: React.FC<ShapeBlurProps> = ({
  variation = 0,
  pixelRatioProp = 1,
  shapeSize = 0.5,
  roundness = 0.5,
  borderSize = 0.05,
  circleSize = 0.5,
  circleEdge = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatioProp;
      canvas.height = rect.height * pixelRatioProp;
      ctx.scale(pixelRatioProp, pixelRatioProp);
    };

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2 / pixelRatioProp;
      const centerY = canvas.height / 2 / pixelRatioProp;
      const size = Math.min(canvas.width, canvas.height) * shapeSize / pixelRatioProp;

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size);
      gradient.addColorStop(0, 'rgba(142, 236, 245, 0.8)');
      gradient.addColorStop(0.5, 'rgba(142, 236, 245, 0.4)');
      gradient.addColorStop(1, 'rgba(142, 236, 245, 0)');

      // Draw main shape
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * circleSize, 0, Math.PI * 2);
      ctx.fill();

      // Add border
      if (borderSize > 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = borderSize * size;
        ctx.stroke();
      }
    };

    resizeCanvas();
    drawShapes();

    const handleResize = () => {
      resizeCanvas();
      drawShapes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [0.8, 1.1, 0.8],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: 'blur(20px)',
          mixBlendMode: 'screen'
        }}
      />
    </motion.div>
  );
};

export default ShapeBlur;
