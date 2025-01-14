import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const Newsletter = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup logic
  }

  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t('newsletter.heading')}
          </h2>
          <p className="text-blue-100 mb-8">
            {t('newsletter.description')}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-6 py-3 rounded-lg text-gray-900"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              {t('newsletter.submit')}
            </button>
          </form>

          <p className="text-blue-100 text-sm mt-4">
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  )
} 