import { useTranslation } from 'react-i18next'
import { ChartBarIcon, ClockIcon, BeakerIcon, ChartPieIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: ClockIcon,
    title: 'features.historical.title',
    description: 'features.historical.description'
  },
  {
    icon: ChartBarIcon,
    title: 'features.charting.title',
    description: 'features.charting.description'
  },
  {
    icon: BeakerIcon,
    title: 'features.backtesting.title',
    description: 'features.backtesting.description'
  },
  {
    icon: ChartPieIcon,
    title: 'features.analysis.title',
    description: 'features.analysis.description'
  }
]

export const Features = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('features.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('features.subheading')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 border rounded-lg">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t(feature.title)}
              </h3>
              <p className="text-gray-600">
                {t(feature.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 