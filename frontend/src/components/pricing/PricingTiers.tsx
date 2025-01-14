import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/24/solid'

const tiers = [
  {
    name: 'pricing.free.name',
    price: 0,
    features: ['pricing.free.features.f1', 'pricing.free.features.f2']
  },
  {
    name: 'pricing.intermediate.name',
    price: 29,
    features: ['pricing.intermediate.features.f1', 'pricing.intermediate.features.f2']
  },
  {
    name: 'pricing.pro.name',
    price: 99,
    features: ['pricing.pro.features.f1', 'pricing.pro.features.f2']
  }
]

export const Pricing = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('pricing.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('pricing.subheading')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{t(tier.name)}</h3>
              <p className="text-4xl font-bold mb-6">
                ${tier.price}<span className="text-gray-500 text-base">/mo</span>
              </p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    {t(feature)}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg">
                {t('pricing.cta')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 