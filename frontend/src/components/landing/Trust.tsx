import { useTranslation } from 'react-i18next'
import { ShieldCheckIcon, ChartBarIcon, DocumentCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const stats = [
  {
    icon: UserGroupIcon,
    value: '50K+',
    label: 'trust.stats.users'
  },
  {
    icon: ChartBarIcon,
    value: '1M+',
    label: 'trust.stats.trades'
  },
  {
    icon: DocumentCheckIcon,
    value: '99.9%',
    label: 'trust.stats.accuracy'
  },
  {
    icon: ShieldCheckIcon,
    value: '24/7',
    label: 'trust.stats.security'
  }
]

export const Trust = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('trust.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('trust.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{t(stat.label)}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">{t('trust.security.title')}</h3>
            <p className="text-gray-600 mb-6">{t('trust.security.description')}</p>
            <ul className="space-y-3">
              {[
                'encryption',
                'monitoring',
                'compliance',
                'backups'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {t(`trust.security.features.${feature}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">{t('trust.accuracy.title')}</h3>
            <p className="text-gray-600 mb-6">{t('trust.accuracy.description')}</p>
            <ul className="space-y-3">
              {[
                'sources',
                'validation',
                'realtime',
                'historical'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <DocumentCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {t(`trust.accuracy.features.${feature}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 