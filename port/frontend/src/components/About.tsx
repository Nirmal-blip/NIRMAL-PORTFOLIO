import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaCode, 
  FaBrain, 
  FaRocket, 
  FaPalette, 
  FaDatabase, 
  FaServer, 
  FaGitAlt
} from 'react-icons/fa'
import CountUp from 'react-countup'

const cardVariants = {
  hover: {
    scale: 1.05,
    rotate: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
    },
  },
}

const About = () => {
  const [activeTab, setActiveTab] = useState<'languages' | 'frameworks' | 'tools'>('languages')

  const techStacks = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'C++'],
    frameworks: ['React', 'Node.js', 'Express', 'Vite', 'Next.js'],
    tools: ['Git', 'Docker', 'Webpack', 'Babel', 'ESLint'],
  } as const

  const expertise = [
    { icon: <FaCode />, title: 'Frontend Development', desc: 'Crafting responsive and engaging user interfaces' },
    { icon: <FaServer />, title: 'Backend Development', desc: 'Building robust and scalable server-side solutions' },
    { icon: <FaDatabase />, title: 'Database Management', desc: 'Designing and optimizing efficient data structures' },
    { icon: <FaBrain />, title: 'Problem Solving', desc: 'Tackling complex challenges with innovative solutions' },
    { icon: <FaRocket />, title: 'Performance Optimization', desc: 'Ensuring smooth and efficient applications' },
    { icon: <FaPalette />, title: 'UI/UX Design', desc: 'Creating intuitive and visually appealing experiences' },
    { icon: <FaGitAlt />, title: 'Version Control', desc: 'Collaborating effectively with modern workflows' },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 rounded-xl shadow-lg"
              whileHover="hover"
              variants={cardVariants}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4 text-blue-400">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Tabs */}
        <div className="mb-16">
          <div className="flex justify-center mb-8 space-x-4">
            {(['languages', 'frameworks', 'tools'] as const).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {techStacks[activeTab].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 3, label: 'Years Experience' },
            { end: 50, label: 'Projects Completed' },
            { end: 20, label: 'Happy Clients' },
            { end: 1000, label: 'Cups of Coffee' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold text-blue-400">
                <CountUp end={stat.end} duration={2.5} />+
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
