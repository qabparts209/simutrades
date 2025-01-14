import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Professional Trader',
    image: '/testimonials/john.jpg',
    quote: 'testimonials.quote1'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Investment Analyst',
    image: '/testimonials/jane.jpg',
    quote: 'testimonials.quote2'
  },
  // Add more testimonials...
]

export const Testimonials = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('testimonials.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('testimonials.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{t(testimonial.quote)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 