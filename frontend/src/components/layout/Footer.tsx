import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const footerSections = [
  {
    title: 'footer.product',
    links: ['features', 'pricing', 'demo', 'docs']
  },
  {
    title: 'footer.company',
    links: ['about', 'blog', 'careers', 'press']
  },
  {
    title: 'footer.resources',
    links: ['community', 'support', 'tutorials', 'api']
  },
  {
    title: 'footer.legal',
    links: ['privacy', 'terms', 'security', 'compliance']
  }
]

export const Footer = () => {
  const { t, i18n } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{t(section.title)}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href={`/${link}`} className="hover:text-white transition">
                      {t(`footer.links.${link}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <select 
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-gray-800 text-white rounded px-3 py-1"
              >
                {i18n.languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {t(`languages.${lang}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-6">
              {['twitter', 'github', 'linkedin', 'discord'].map((social) => (
                <a
                  key={social}
                  href={t(`footer.social.${social}.url`)}
                  className="hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`footer.social.${social}.name`)}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()} SimuTrades. {t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 