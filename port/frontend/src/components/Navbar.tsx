import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Github, Linkedin, Sun, Moon, Mail, Globe, Twitter, Instagram } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const socialIcons = [
  { Icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-200' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
  { Icon: Mail, label: 'Email', href: '#', color: 'hover:text-red-400' },
  { Icon: Globe, label: 'Website', href: '#', color: 'hover:text-green-400' },
  { Icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-blue-300' },
  { Icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState('dark')
  const underlineRef = useRef<HTMLSpanElement | null>(null)
  const linksRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const navRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: navRef })
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.8])

  // Scroll handler for active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      
      // Get all sections
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element)
      
      // Find the section currently in view
      const scrollPosition = window.scrollY + 100 // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActive(section.id)
            break
          }
        }
      }
    }
    
    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
    setActive(id)
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const elTarget = e.currentTarget as HTMLAnchorElement
    const rect = elTarget.getBoundingClientRect()
    const parentRect = elTarget.parentElement!.getBoundingClientRect()
    if (underlineRef.current) {
      underlineRef.current.style.width = `${rect.width}px`
      underlineRef.current.style.left = `${rect.left - parentRect.left}px`
    }
  }

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-lg border-b border-white/15 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        style={{ opacity: backgroundOpacity }}
      />

      <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-4">
        {/* Left Navigation */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 relative">
            <motion.span 
              ref={underlineRef} 
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out" 
              initial={{ width: 0 }}
              animate={{ width: linksRef.current[active]?.offsetWidth || 0, left: linksRef.current[active]?.offsetLeft || 0 }}
            />
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                ref={(el) => {
                  if (el) linksRef.current[item.id] = el as any;
                }}
                to={item.id === 'home' ? '/' : `/${item.id}`}
                onClick={handleNavLinkClick}
                className={({ isActive }) => `
                  relative px-4 py-2 text-sm nav-text transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                `}
                aria-current={item.id === active ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link to="/" className="brand-display text-2xl text-transparent bg-clip-text gradient-text text-shadow">
            {'</NIRMAL>'}
          </Link>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-2">
            {socialIcons.map(({ Icon, label, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`p-2 text-white/70 ${color} transition-colors relative group`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="size-5" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-xs bg-gray-900/90 text-white px-2 py-1 rounded-md shadow-lg">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <motion.button 
              onClick={() => setOpen((v) => !v)} 
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/70 hover:text-white"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: open ? 'auto' : 0, 
          opacity: open ? 1 : 0,
          scaleY: open ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="md:hidden overflow-hidden border-t border-white/15 bg-gray-900/90 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 100 }}
              className="text-left text-sm font-semibold py-3 px-4 rounded-lg hover:bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white/80 hover:text-white transition-all"
            >
              {item.label}
            </motion.button>
          ))}
          {/* Mobile Social Icons */}
          <div className="flex gap-3 mt-4 justify-center">
            {socialIcons.map(({ Icon, label, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`p-2 text-white/70 ${color} transition-colors`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + navItems.length) }}
              >
                <Icon className="size-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}