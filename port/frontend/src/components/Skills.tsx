import { motion } from 'framer-motion'
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiCplusplus, SiFigma, SiCanva, SiAdobephotoshop } from 'react-icons/si'

const skillNodes = [
  {
    id: 'html',
    name: 'HTML',
    icon: SiHtml5,
    x: 10,
    y: 20,
    status: 'completed',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'css',
    name: 'CSS',
    icon: SiCss3,
    x: 25,
    y: 15,
    status: 'completed',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: SiJavascript,
    x: 40,
    y: 25,
    status: 'completed',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'react',
    name: 'React',
    icon: SiReact,
    x: 55,
    y: 20,
    status: 'completed',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: SiNextdotjs,
    x: 70,
    y: 15,
    status: 'completed',
    color: 'from-gray-500 to-gray-700'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: SiNodedotjs,
    x: 20,
    y: 60,
    status: 'completed',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'express',
    name: 'Express',
    icon: SiExpress,
    x: 35,
    y: 55,
    status: 'completed',
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: SiMongodb,
    x: 50,
    y: 60,
    status: 'completed',
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: SiMysql,
    x: 65,
    y: 55,
    status: 'completed',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: SiCplusplus,
    x: 80,
    y: 50,
    status: 'completed',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: SiFigma,
    x: 15,
    y: 85,
    status: 'completed',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: SiCanva,
    x: 30,
    y: 80,
    status: 'completed',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: SiAdobephotoshop,
    x: 45,
    y: 85,
    status: 'completed',
    color: 'from-blue-600 to-indigo-600'
  }
]

const routeConnections = [
  { from: 'html', to: 'css' },
  { from: 'css', to: 'js' },
  { from: 'js', to: 'react' },
  { from: 'react', to: 'nextjs' },
  { from: 'html', to: 'nodejs' },
  { from: 'nodejs', to: 'express' },
  { from: 'express', to: 'mongodb' },
  { from: 'mongodb', to: 'mysql' },
  { from: 'mysql', to: 'cpp' },
  { from: 'html', to: 'figma' },
  { from: 'figma', to: 'canva' },
  { from: 'canva', to: 'photoshop' }
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full px-4 py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="heading text-4xl md:text-5xl mb-4 text-shadow">Skills Journey Map</h2>
        <p className="body-text text-lg text-gray-300 max-w-2xl mx-auto">
          Follow my learning path through different technologies and domains
        </p>
      </motion.div>

      <div className="relative">
        {/* Map Background */}
        <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
            <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-32 right-32 w-18 h-18 border-2 border-white/20 rounded-full"></div>
          </div>

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {routeConnections.map((connection, index) => {
              const fromNode = skillNodes.find(node => node.id === connection.from)
              const toNode = skillNodes.find(node => node.id === connection.to)
              if (!fromNode || !toNode) return null
              
              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              )
            })}
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8eecf5" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Skill Nodes */}
          {skillNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.3,
                rotate: 5,
                transition: { 
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
            >
              <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${node.color} p-1 shadow-lg`}>
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <node.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                
                {/* Node Label */}
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {node.name}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-white body-semibold mb-2 text-shadow">Legend</h4>
                <div className="flex items-center gap-2 text-sm body-text text-gray-300">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Completed</span>
                </div>
              </div>
        </div>
      </div>
    </section>
  )
}


