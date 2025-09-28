import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Project = {
  title: string
  description: string
  image: string
  github?: string
  demo?: string
  tech: string[]
}

const projects: Project[] = [
  {
    title: 'RentHive',
    description:
      'RentHive is a comprehensive full-stack rental management system developed with Node.js, Express, MongoDB, and React. It offers robust features for efficiently handling every aspect of a rental business, from detailed product and inventory management to secure payment processing, sophisticated customer management, and insightful business analytics. With JWT authentication, dynamic pricing, automated notifications, and PDF invoice generation, RentHive streamlines operations and enhances the rental experience for both businesses and customers.',
    image: '/projects/RentHive.webp',
    github: 'https://github.com/your-username/renthive',
    demo: '#',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT'],
  },
  {
    title: 'SkillLink',
    description:
      'The SkillLink platform is a modern, responsive web application designed for peer-to-peer skill exchange. It features a modern, responsive frontend built with Next.js and Tailwind CSS, complemented by a robust NestJS and MongoDB backend. SkillLink empowers users to create detailed profiles, browse and filter skills, manage swap requests, and rate exchanges, all powered by an intelligent matching algorithm. It also includes a comprehensive admin panel for seamless user and swap management.',
    image: '/projects/SkillLink.webp',
    github: 'https://github.com/your-username/skilllink',
    demo: '#',
    tech: ['Next.js', 'Tailwind CSS', 'NestJS', 'MongoDB'],
  },
  {
    title: 'Telemedicine',
    description:
      'This AI-powered healthcare system features a multilingual NLP interface, a chatbot for symptom-based diagnosis, and automated appointment scheduling. It offers secure video consultations, an interactive map for nearby services, and a medicine recognition model that suggests alternatives based on images or names.',
    image: '/projects/Telemedicine.webp',
    github: 'https://github.com/your-username/telemedicine',
    demo: '#',
    tech: ['AI/ML', 'NLP', 'React', 'Node.js', 'MongoDB'],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1 },
}

const buttonVariants = {
  hover: {
    scale: 1.08,
    boxShadow: '0 10px 20px rgba(142, 236, 245, 0.3)',
  },
  tap: {
    scale: 0.95,
  },
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="mx-auto w-full px-6 py-28 bg-gradient-to-b from-gray-800 to-gray-900"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={item} className="text-center">
          <h2 className="heading text-5xl text-transparent bg-clip-text gradient-text text-shadow-lg">
            My Projects
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
          />
        </motion.div>

        <div className="mt-14 space-y-10">
          {projects.map((p, idx) => (
            <motion.article
              key={p.title}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="rounded-3xl bg-white/5 p-3 shadow-2xl"
            >
              <div className="rounded-[22px] border border-white/15 bg-black/40 p-4">
                <div
                  className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${
                    idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Project image */}
                  <div className="relative">
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-2 shadow-inner">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="pointer-events-none absolute -inset-2 rounded-[26px] ring-1 ring-white/10" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="heading text-3xl text-gray-100 text-shadow">
                      {p.title}
                    </h3>
                    <p className="body-text mt-4 text-[15px] leading-7 text-gray-300">
                      {p.description}
                    </p>

                    {/* Tech badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/10 px-3 py-0.5 text-xs body-semibold text-[#8eecf5]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                      <motion.a
                        href={p.demo}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm body-semibold text-gray-900 shadow hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault()
                          setOpen(p)
                        }}
                      >
                        Explore
                        <span className="translate-x-0 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </motion.a>
                      {p.github && (
                        <motion.a
                          href={p.github}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm body-semibold text-white/90 hover:bg-white/10"
                        >
                          GitHub
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-[min(90vw,900px)] rounded-2xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="heading text-2xl text-white text-shadow">
                {open.title}
              </h3>
              <p className="mt-3 text-sm body-text text-gray-300">
                {open.description}
              </p>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-white/5">
                <img
                  src={open.image}
                  alt={open.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {open.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/10 px-3 py-0.5 text-xs body-semibold text-[#8eecf5]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
