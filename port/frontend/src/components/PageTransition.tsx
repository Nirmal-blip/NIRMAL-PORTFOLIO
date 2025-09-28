import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PageTransition() {
  const location = useLocation()
  const [routeKey, setRouteKey] = useState(location.pathname)

  useEffect(() => {
    setRouteKey(location.pathname)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div key={routeKey} className="pointer-events-none fixed inset-0 z-[80]">
        {/* Three layered wipes: green, white, black */}
        <motion.div
          initial={{ x: '-100%', opacity: 1 }}
          animate={{ x: ['-100%', '0%', '100%'], opacity: [1, 1, 1] }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#2c5991]"
        />
        <motion.div
          initial={{ x: '-100%', opacity: 1 }}
          animate={{ x: ['-100%',  '200%'], opacity: [1, 1, 1] }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.83 }}
          className="absolute inset-y-0  w-[80%] bg-[#0e141b] "
        />
        <motion.div
          initial={{ x: '-100%', opacity: 1 }}
          animate={{ x: ['-100%', '200%'], opacity: [1, 1, 1] }}
          transition={{ duration: 1.7, ease: 'easeInOut', delay: 0.85 }}
          className="absolute inset-y-0  w-[50%] bg-white "
        />
      </motion.div>
    </AnimatePresence>
  )
}


