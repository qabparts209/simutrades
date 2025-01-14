import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MarketDataPreview } from './MarketDataPreview'

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="relative h-screen flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-bold text-white">
              {t('hero.headline')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('hero.subheadline')}
            </p>
            <div className="space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg">
                {t('hero.cta.primary')}
              </button>
              <button className="px-8 py-3 border border-white text-white rounded-lg">
                {t('hero.cta.secondary')}
              </button>
            </div>
          </motion.div>
          <div className="hidden lg:block">
            <MarketDataPreview />
          </div>
        </div>
      </div>
    </section>
  )
} 