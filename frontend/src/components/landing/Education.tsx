import { useTranslation } from 'react-i18next'
import { BookOpenIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export const Education = () => {
  const { t } = useTranslation()

  const tutorials = [
    {
      title: 'education.tutorials.basic.title',
      description: 'education.tutorials.basic.description',
      icon: BookOpenIcon,
    },
    {
      title: 'education.tutorials.advanced.title',
      description: 'education.tutorials.advanced.description',
      icon: AcademicCapIcon,
    },
    {
      title: 'education.tutorials.strategies.title',
      description: 'education.tutorials.strategies.description',
      icon: UserGroupIcon,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('education.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('education.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <tutorial.icon className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">{t(tutorial.title)}</h3>
              <p className="text-gray-600 mb-6">{t(tutorial.description)}</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                {t('education.cta.learn')} →
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg">
            {t('education.cta.browse')}
          </button>
        </div>
      </div>
    </section>
  )
} 