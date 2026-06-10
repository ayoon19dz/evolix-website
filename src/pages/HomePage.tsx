import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import ROICalculatorSection from '../components/sections/ROICalculatorSection'
import AboutSection from '../components/sections/AboutSection'
import CTASection from '../components/sections/CTASection'
import PageTransition from '../components/ui/PageTransition'
import { useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function HomePage() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = `EVOLIX AI — ${t.hero.subtitle}`
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t.hero.description)
    }
  }, [t])

  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        <HeroSection />
        <HowItWorksSection />
        <ServicesSection />
        <ROICalculatorSection />
        <AboutSection />
        <CTASection />
      </div>
    </PageTransition>
  )
}
