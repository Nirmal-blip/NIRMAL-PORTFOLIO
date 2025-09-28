import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { useState, useRef } from 'react'
import { 
  FaCode, 
  FaBrain, 
  FaCloud, 
  FaRocket, 
  FaPalette, 
  FaDatabase, 
  FaMobile, 
  FaServer, 
  FaGitAlt
} from 'react-icons/fa'
import { 
  SiReact, 
  SiTypescript, 
  SiPython, 
  SiJavascript, 
  SiNodedotjs, 
  SiMongodb, 
  SiDocker, 
  SiFigma, 
  SiTensorflow
} from 'react-icons/si'

const tabs = ['Languages', 'Libraries & Frameworks', 'Machine Learning', 'Tools & Platforms'] as const
type Tab = (typeof tabs)[number]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1
  }
}

const item = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1
  }
}

const cardVariants = {
  hover: {
    y: -15,
    scale: 1.08,
    boxShadow: '0 30px 60px rgba(142, 236, 245, 0.4)'
  },
  tap: {
    scale: 0.95,
  },
}

const iconVariants = {
  hover: {
    scale: 1.3,
    rotate: [0, 360]
  }
}

const headingVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0
  }
}

export default function About() {
  const [active, setActive] = useState<Tab>('Languages')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" })

  const techStacks = {
    Languages: [
      { name: 'Python', icon: SiPython, color: 'from-yellow-400 to-orange-500', proficiency: 95 },
      { name: 'JavaScript', icon: SiJavascript, color: 'from-yellow-300 to-yellow-500', proficiency: 90 },
      { name: 'TypeScript', icon: SiTypescript, color: 'from-blue-500 to-blue-600', proficiency: 85 },
      { name: 'C++', icon: FaCode, color: 'from-blue-600 to-blue-800', proficiency: 80 }
    ],
    'Libraries & Frameworks': [
      { name: 'React', icon: SiReact, color: 'from-cyan-400 to-blue-500', proficiency: 95 },
      { name: 'Node.js', icon: SiNodedotjs, color: 'from-green-500 to-green-600', proficiency: 90 },
      { name: 'Express', icon: FaServer, color: 'from-gray-600 to-gray-800', proficiency: 85 },
      { name: 'TensorFlow', icon: SiTensorflow, color: 'from-orange-500 to-orange-600', proficiency: 80 }
    ],
    'Machine Learning': [
      { name: 'TensorFlow', icon: SiTensorflow, color: 'from-orange-500 to-orange-600', proficiency: 90 },
      { name: 'PyTorch', icon: FaBrain, color: 'from-red-500 to-red-600', proficiency: 85 },
      { name: 'Scikit-learn', icon: FaBrain, color: 'from-blue-500 to-blue-600', proficiency: 80 },
      { name: 'Pandas', icon: FaDatabase, color: 'from-green-500 to-green-600', proficiency: 85 }
    ],
    'Tools & Platforms': [
      { name: 'Docker', icon: SiDocker, color: 'from-blue-500 to-blue-600', proficiency: 85 },
      { name: 'MongoDB', icon: SiMongodb, color: 'from-green-500 to-green-600', proficiency: 80 },
      { name: 'Figma', icon: SiFigma, color: 'from-purple-500 to-pink-500', proficiency: 75 },
      { name: 'Git', icon: FaGitAlt, color: 'from-orange-500 to-red-500', proficiency: 90 }
    ]
  }

  const expertise = [
    {
      icon: FaCode,
      title: 'Full-Stack Development',
      description: 'Building end-to-end applications with modern frameworks and best practices.',
      stats: '50+ Projects'
    },
    {
      icon: FaBrain,
      title: 'AI & Machine Learning',
      description: 'Developing intelligent solutions using cutting-edge ML algorithms and frameworks.',
      stats: '3+ Years'
    },
    {
      icon: FaRocket,
      title: 'Product Development',
      description: 'Creating scalable products that solve real-world problems with user-centric design.',
      stats: '10+ Products'
    },
    {
      icon: FaPalette,
      title: 'UI/UX Design',
      description: 'Crafting beautiful, intuitive interfaces that enhance user experience.',
      stats: '100+ Designs'
    }
  ]

  const stats = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 3, label: 'Years Experience', suffix: '+' },
    { number: 100, label: 'Happy Clients', suffix: '%' },
    { number: 24, label: 'Hours Support', suffix: '/7' }
  ]

  return (
    <section id="about" className="py-6 pt-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="text-center mb-24 max-w-6xl mx-auto px-4"
      >
        <motion.h2
          variants={headingVariants}
          className="text-5xl sm:text-6xl lg:text-7xl section-title text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] mb-8"
        >
          Transforming Ideas Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8eecf5] to-cyan-400">
            Innovation
          </span>
        </motion.h2>
        
        <motion.p 
          variants={item}
          className="text-xl sm:text-2xl hero-subtitle text-gray-100 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          I'm a passionate developer who loves creating digital experiences that make a difference. 
          With expertise in full-stack development and AI, I bring ideas to life through code.
        </motion.p>

        {/* Stats Section */}
        <motion.div 
          variants={item}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center"
            >
              <div className="stats-number text-4xl font-bold text-[#8eecf5] mb-2">
                <CountUp
                  end={stat.number}
                  duration={2}
                  suffix={stat.suffix}
                />
              </div>
              <div className="body-text text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Cards */}
        <motion.div 
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {expertise.map((area, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#8eecf5]/50 transition-all duration-300"
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="w-12 h-12 bg-gradient-to-br from-[#8eecf5] to-cyan-400 rounded-xl flex items-center justify-center mb-4"
              >
                <area.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="card-title text-lg font-semibold text-white mb-2">{area.title}</h3>
              <p className="card-text text-sm text-gray-300 mb-3">{area.description}</p>
              <div className="brand-accent text-sm font-semibold text-[#8eecf5]">{area.stats}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          className="px-4"
        >
          <motion.h3
            variants={headingVariants}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] text-center mb-10"
          >
            Technology Stack
          </motion.h3>
          
          <motion.div 
            variants={item}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === tab
                    ? 'bg-[#8eecf5] text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {techStacks[active].map((tech, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#8eecf5]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center`}>
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="tech-badge text-sm font-semibold text-white text-center mb-2">{tech.name}</h4>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${tech.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <div className="text-xs text-gray-400 text-center mt-1">{tech.proficiency}%</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}