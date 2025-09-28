export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

export const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

export const page = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

export const hoverLift = {
  whileHover: { y: -6, scale: 1.01 },
  transition: { type: 'spring', stiffness: 300 },
}



