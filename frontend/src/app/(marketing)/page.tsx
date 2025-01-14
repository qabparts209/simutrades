import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/pricing/PricingTiers'
import { Community } from '@/components/community/Community'

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <Community />
    </div>
  )
} 