import { useTranslation } from 'react-i18next'
import { ChatBubbleLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export const Community = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">{t('community.heading')}</h2>
          <p className="text-gray-600 mt-4">{t('community.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Slack Community */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <ChatBubbleLeftIcon className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">{t('community.slack.title')}</h3>
            <p className="text-gray-600 mb-6">{t('community.slack.description')}</p>
            <ul className="space-y-3 mb-8">
              {[
                'channels.trading',
                'channels.analysis',
                'channels.strategies',
                'channels.support'
              ].map((channel) => (
                <li key={channel} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  {t(`community.slack.${channel}`)}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg">
              {t('community.slack.join')}
            </button>
          </div>

          {/* Discord Community */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <UserGroupIcon className="h-12 w-12 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">{t('community.discord.title')}</h3>
            <p className="text-gray-600 mb-6">{t('community.discord.description')}</p>
            <ul className="space-y-3 mb-8">
              {[
                'channels.general',
                'channels.market_chat',
                'channels.technical_analysis',
                'channels.help'
              ].map((channel) => (
                <li key={channel} className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                  {t(`community.discord.${channel}`)}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg">
              {t('community.discord.join')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 