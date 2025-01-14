declare module 'framer-motion' {
  export const motion: any
  export const AnimatePresence: any
}

declare module 'react-i18next' {
  export const useTranslation: () => {
    t: (key: string) => string
    i18n: {
      changeLanguage: (lang: string) => Promise<void>
      language: string
      languages: string[]
    }
  }
  export const initReactI18next: any
}

declare module 'i18next-browser-languagedetector' {
  const LanguageDetector: any
  export default LanguageDetector
}

declare module 'socket.io-client' {
  const io: any
  export default io
} 