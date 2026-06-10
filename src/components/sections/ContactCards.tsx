import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { motion } from 'framer-motion'

const WA_LINK    = 'https://wa.me/213697491030'
const EMAIL_LINK = 'mailto:evolixai19@gmail.com'

export default function ContactCards() {
  const { t } = useLanguage()
  const ease = [0.16, 1, 0.3, 1] as const

  const cards = [
    {
      href:       WA_LINK,
      target:     '_blank',
      rel:        'noopener noreferrer',
      ariaLabel:  t.contactPage.whatsapp.label,
      icon:       MessageCircle,
      iconColor:  '#25D366',
      glow:       'rgba(37,211,102,0.25)',
      hoverBg:    'rgba(37,211,102,0.06)',
      btnBg:      '#25D366',
      title:      t.contactPage.whatsapp.title,
      subtitle:   '+213 697 491 030',
      subtitleDir:'ltr' as const,
      button:     t.contactPage.whatsapp.button,
      tag:        t.contactPage.whatsapp.title,
    },
    {
      href:       EMAIL_LINK,
      target:     undefined,
      rel:        undefined,
      ariaLabel:  t.contactPage.email.label,
      icon:       Mail,
      iconColor:  'var(--brand)',
      glow:       'rgba(124,58,237,0.25)',
      hoverBg:    'rgba(124,58,237,0.06)',
      btnBg:      'linear-gradient(135deg, var(--brand), var(--brand-mid))',
      title:      t.contactPage.email.title,
      subtitle:   'evolixai19@gmail.com',
      subtitleDir: 'ltr' as const,
      button:     t.contactPage.email.button,
      tag:        t.contactPage.email.title,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <motion.a
            key={card.tag}
            href={card.href}
            target={card.target}
            rel={card.rel}
            aria-label={card.ariaLabel}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative flex flex-col items-center justify-center gap-5 p-12 rounded-3xl text-center overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              textDecoration: 'none',
            }}
          >
            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.glow} 0%, transparent 70%)` }}
            />
            {/* Corner arrow */}
            <div
              className="absolute top-4 right-4 w-7 h-7 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: card.hoverBg }}
            >
              <ArrowUpRight size={14} style={{ color: card.iconColor }} />
            </div>

            {/* Tag */}
            <span
              className="relative z-10 text-xs font-mono tracking-widest uppercase"
              style={{ color: 'var(--text-subtle)' }}
            >
              {card.tag}
            </span>

            {/* Icon */}
            <div
              className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: card.hoverBg,
                border: `1px solid ${card.glow}`,
                boxShadow: `0 12px 30px ${card.glow}`,
              }}
            >
              <Icon size={40} style={{ color: card.iconColor }} />
            </div>

            {/* Text */}
            <div className="relative z-10">
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="text-base" style={{ color: 'var(--text-muted)' }} dir={card.subtitleDir}>
                {card.subtitle}
              </p>
            </div>

            {/* Button */}
            <span
              className="relative z-10 mt-2 px-8 py-3 rounded-2xl text-sm font-bold text-white transition-all group-hover:scale-105"
              style={{ background: card.btnBg, boxShadow: `0 8px 20px ${card.glow}` }}
            >
              {card.button}
            </span>
          </motion.a>
        )
      })}
    </div>
  )
}
