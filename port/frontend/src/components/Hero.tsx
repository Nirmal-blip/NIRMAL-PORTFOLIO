import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center"
    >
      {/* Background decorative elements with parallax effect */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#8eecf5]/20 to-white/20 blur-3xl"
          initial={{ y: 0, scale: 1 }}
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute right-1/2 top-1/2 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-gradient-to-l from-cyan-500/20 to-blue-500/20 blur-2xl"
          initial={{ x: 0, y: 0 }}
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="order-2 lg:order-1">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center lg:text-left"
            >
            <motion.p
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-sm brand-accent uppercase tracking-widest text-[#8eecf5] text-shadow"
            >
              WELCOME, I'M
            </motion.p>
            <motion.h1
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-title mt-3 gradient-text text-5xl sm:text-6xl lg:text-7xl"
            >
              NIRMAL JOSHI
            </motion.h1>
            <motion.p
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 text-lg hero-subtitle text-gray-100 sm:text-xl lg:text-2xl text-shadow"
            >
              As a dedicated <span className="brand-accent text-[#8eecf5]">AI Product Developer</span>, I craft
              intelligent, full-stack solutions that blend cutting-edge machine learning with seamless user
              experiences.
            </motion.p>
            <motion.p
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-4 text-base brand-body text-gray-300 sm:text-lg"
            >
              I specialize in building scalable applications with modern technologies, focusing on creating
              intuitive user experiences that make complex AI accessible to everyone.
            </motion.p>
            <motion.div
              variants={item}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-x-6"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg border-2 border-[#8eecf5] bg-[#8eecf5] px-7 py-3.5 text-sm brand-accent text-black transition-colors hover:bg-[#8eecf5]/90"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-lg border-2 border-[#8eecf5] px-7 py-3.5 text-sm brand-accent text-[#8eecf5] transition-colors hover:bg-[#8eecf5]/20 hover:text-white"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
  <motion.div
    initial={{ scale: 0.85, opacity: 0, rotate: 3 }}
    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
    className="relative w-full max-w-xl mx-auto lg:mx-0"
  >
    <motion.img
      src="/nirmal.png"
      alt="Nirmal Joshi"
      className="w-full h-auto rounded-2xl" // removed shadow-2xl
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    />
  </motion.div>
</div>

        </div>
      </div>
    </section>
  )
}