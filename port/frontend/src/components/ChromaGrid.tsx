import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface ChromaGridItem {
  image: string
  title: string
  subtitle: string
  handle: string
  borderColor: string
  gradient: string
  url: string
}

interface ChromaGridProps {
  items: ChromaGridItem[]
  radius?: number
  damping?: number
  className?: string
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  radius = 300,
  damping = 0.45,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { damping, stiffness: 100 })
  const springY = useSpring(mouseY, { damping, stiffness: 100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const getItemPosition = (index: number) => {
    const angle = (index / items.length) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ height: '600px' }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(142, 236, 245, 0.3), transparent 50%)`,
        }}
      />

      {items.map((item, index) => {
        const position = getItemPosition(index)
        const isHovered = hoveredIndex === index

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              x: position.x,
              y: position.y,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: position.x + (isHovered ? 0 : springX.get() * 0.1),
              y: position.y + (isHovered ? 0 : springY.get() * 0.1),
              scale: isHovered ? 1.2 : 1,
              zIndex: isHovered ? 20 : 10,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Card */}
              <div
                className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: item.gradient,
                  border: `2px solid ${item.borderColor}`,
                }}
              >
                {/* Image */}
                <div className="w-full h-32 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80 mb-2">{item.subtitle}</p>
                  <p className="text-xs opacity-60">{item.handle}</p>
                </div>
              </div>

              {/* Glow effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle, ${item.borderColor}40, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
              )}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ChromaGrid
