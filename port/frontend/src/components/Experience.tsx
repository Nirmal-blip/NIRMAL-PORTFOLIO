import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SiReact, SiNodedotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

type Experience = {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
}

const techIcons = [SiReact, SiNodedotjs, SiTypescript, SiTailwindcss]

const experiences: Experience[] = [
  {
    company: 'Acme Corp',
    role: 'Frontend Engineer',
    period: '2023 – Present',
    description:
      'Built interactive dashboards, optimized performance, and led UI architecture with modern React and TypeScript workflows.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind'],
  },
  {
    company: 'Startup XYZ',
    role: 'Full Stack Developer',
    period: '2021 – 2023',
    description:
      'Developed end-to-end features, integrating APIs and crafting real-time, user-focused experiences across the stack.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'React'],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1
  }
}

const item = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1
  }
}

const cardVariants = {
  hover: {
    y: -8,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25)'
  }
}

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 5
  }
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      layout
      variants={cardVariants}
      whileHover="hover"
      onClick={() => setOpen((v) => !v)}
      className="cursor-pointer rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-lg transition-transform"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            {exp.role}
          </h3>
          <p className="text-sm text-gray-400">{exp.company} • {exp.period}</p>
        </div>
        <motion.span
          className="text-xs text-gray-400"
          whileHover={{ color: '#8eecf5', scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {open ? 'Collapse' : 'Expand'}
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-gray-300">{exp.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <motion.span
                  key={t}
                  className="rounded-full bg-[#8eecf5]/20 px-3 py-1 text-xs text-gray-200 border border-[#8eecf5]/30"
                  whileHover={{ scale: 1.05, backgroundColor: '#8eecf5/30' }}
                  transition={{ duration: 0.2 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto w-full px-6  bg-gradient-to-b from-gray-800 to-gray-900">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
        <motion.div variants={item} className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 sm:text-4xl lg:text-5xl">
            Work Experience
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-[#8eecf5] to-white"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          {techIcons.map((Icon, idx) => (
            <motion.div
              key={idx}
              variants={iconVariants}
              whileHover="hover"
              className="rounded-xl bg-white/10 backdrop-blur-sm p-4 shadow-md"
            >
              <Icon className="h-8 w-8 text-[#8eecf5]" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {experiences.map((exp) => (
            <ExperienceCard key={exp.company} exp={exp} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
