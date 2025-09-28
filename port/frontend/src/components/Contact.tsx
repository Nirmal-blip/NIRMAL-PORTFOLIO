import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi'
import { SiGithub, SiLinkedin, SiX, SiInstagram } from 'react-icons/si'

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(10, 'Message is too short'),
})

type FormData = z.infer<typeof schema>

const contactInfo = [
  {
    icon: FiMail,
    title: 'Email',
    value: 'nirmaljoshi123456789@gmail.com',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: '+91 9368015556',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FiMapPin,
    title: 'Location',
    value: 'HALDWANI NAINITAL,UTTARAKHAND',
    color: 'from-blue-400 to-blue-500'
  }
]

const socialLinks = [
  { icon: SiGithub, href: '#', color: 'from-gray-500 to-gray-700' },
  { icon: SiLinkedin, href: '#', color: 'from-blue-600 to-blue-800' },
  { icon: SiX, href: '#', color: 'from-cyan-500 to-blue-500' },
  { icon: SiInstagram, href: '#', color: 'from-pink-500 to-purple-500' }
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setSent(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSent(false)
      }, 5000)
      
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="mx-auto w-full px-4 py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
            <h2 className="section-title text-4xl md:text-5xl mb-4 text-shadow">Let's Connect</h2>
            <p className="body-text text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's start a conversation about your next project.
            </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
              <div>
                <h3 className="card-title text-2xl mb-6 text-shadow">Get in Touch</h3>
                <p className="body-text text-gray-300 mb-8">
                  I'm always excited to work on new projects and collaborate with amazing people.
                  Whether you have a question or want to say hi, I'll try my best to get back to you!
                </p>
              </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  x: 12,
                  boxShadow: '0 15px 30px rgba(142, 236, 245, 0.2)',
                  transition: { 
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
                className="group"
              >
                <div className="glass rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 group-hover:shadow-lg">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                      <div>
                        <h4 className="contact-label text-white text-shadow">{info.title}</h4>
                        <p className="body-text text-gray-300">{info.value}</p>
                      </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
              <div>
                <h4 className="contact-label text-white mb-4 text-shadow">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 10,
                    boxShadow: '0 10px 20px rgba(142, 236, 245, 0.3)',
                    transition: { 
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center transition-all duration-300 hover:shadow-lg`}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
              <div className="glass rounded-3xl p-8">
                <h3 className="card-title text-2xl mb-6 text-shadow">Send a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                    <label className="block text-sm contact-label text-gray-200 mb-2">Name</label>
                <input
                  {...register('name')}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                    <label className="block text-sm contact-label text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                    <label className="block text-sm contact-label text-gray-200 mb-2">Subject</label>
                <input
                  {...register('subject')}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.subject.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                    <label className="block text-sm contact-label text-gray-200 mb-2">Message</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: '0 15px 30px rgba(142, 236, 245, 0.4)',
                    transition: { 
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 brand-accent text-white transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-400"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    <span className="text-sm">Thanks for reaching out!</span>
                  </motion.div>
                )}
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


