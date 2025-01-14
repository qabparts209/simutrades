import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { PlayIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline'

export const Demo = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('demo.heading')}</h2>
          <p className="text-gray-300 mt-4">{t('demo.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <PlayIcon className="h-8 w-8 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">{t('demo.quickstart.title')}</h3>
                <p className="text-gray-300">{t('demo.quickstart.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ChartBarIcon className="h-8 w-8 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">{t('demo.features.title')}</h3>
                <p className="text-gray-300">{t('demo.features.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CogIcon className="h-8 w-8 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">{t('demo.customization.title')}</h3>
                <p className="text-gray-300">{t('demo.customization.description')}</p>
              </div>
            </div>

            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg w-full">
              {t('demo.cta.try')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            {/* Interactive Demo Component */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="/demo/preview"
                className="w-full h-full rounded-lg"
                title={t('demo.preview.title')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 