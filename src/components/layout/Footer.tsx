import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import { Zap, MessageCircle, Briefcase, Code, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const { t } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  const navLinks = [
    { to: '/#about',    label: t.nav.about },
    { to: '/#services', label: t.nav.services },
    { to: '/contact',   label: t.nav.contact },
  ]

  const legalLinks = [
    { href: '#', label: t.footer.privacy },
    { href: '#', label: t.footer.terms },
  ]

  const socialLinks = [
    { href: '#', icon: MessageCircle, label: t.footer.twitter },
    { href: '#', icon: Briefcase,     label: t.footer.linkedin },
    { href: '#', icon: Code,          label: t.footer.github },
  ]

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8 px-6"
      style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}
    >
      {/* Animated bottom aurora */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >

          {/* Brand */}
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
          >
            <Link to="/" aria-label="EVOLIX AI — Home" className="flex items-center gap-2.5 mb-5 w-fit group">
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-accent))' }}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Zap size={18} color="#fff" strokeWidth={2.5} />
              </motion.div>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
              >
                EVOLIX <span style={{ color: 'var(--brand)' }}>AI</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {t.footer.mission}
            </p>

            {/* Socials with hover animations */}
            <div className="flex gap-3">
              {socialLinks.map(s => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)',
                    }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Icon size={16} className="group-hover:text-brand transition-colors" style={{ color: 'inherit' }} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
          >
            <h3
              className="font-bold mb-5 text-sm tracking-widest uppercase"
              style={{ color: 'var(--text-subtle)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t.footer.company}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1 text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
          >
            <h3
              className="font-bold mb-5 text-sm tracking-widest uppercase"
              style={{ color: 'var(--text-subtle)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t.footer.legal}
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <span className="relative w-2 h-2 rounded-full bg-green-400">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
            <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{t.footer.operational}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
