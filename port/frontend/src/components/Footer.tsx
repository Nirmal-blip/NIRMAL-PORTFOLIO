import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99], // ✅ cubic bezier is fine
    },
  },
}

const linkVariants = {
  hover: {
    scale: 1.1,
    color: '#8eecf5',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1], // ✅ replaced 'easeOut' with cubic bezier
    },
  },
}

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#8eecf5]/20 bg-gradient-to-t from-gray-900 to-gray-800">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-sm sm:flex-row"
      >
        <motion.span
          variants={item}
          className="body-semibold text-transparent bg-clip-text gradient-text text-shadow"
        >
          © {new Date().getFullYear()} NIRMAL JOSHI
        </motion.span>
        <motion.div variants={item} className="flex gap-6">
          {[
            { href: 'https://github.com', Icon: FaGithub, label: 'GitHub' },
            { href: 'https://linkedin.com', Icon: FaLinkedin, label: 'LinkedIn' },
            { href: 'https://twitter.com', Icon: FaTwitter, label: 'Twitter' },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-gray-500 transition-colors"
            >
              <Icon className="h-5 w-5 text-[#8eecf5]" />
              <span className="hidden sm:inline body-text text-transparent bg-clip-text gradient-text">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  )
}
