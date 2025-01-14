import React from 'react'

export const illustrations = {
  emptyState: () => (
    <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
      <rect width="240" height="180" fill="white"/>
      <path 
        d="M120 90c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z"
        fill="#E2E8F0"
      />
      <path
        d="M120 100c-26.5 0-48 21.5-48 48v12h96v-12c0-26.5-21.5-48-48-48z"
        fill="#E2E8F0"
      />
    </svg>
  ),
  noResults: () => (
    <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
      <rect width="240" height="180" fill="white"/>
      <path
        d="M160 80H80V100H160V80Z"
        fill="#E2E8F0"
      />
    </svg>
  ),
} as const

export interface IllustrationProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof illustrations
}

export const Illustration: React.FC<IllustrationProps> = ({ name, ...props }) => {
  const IllustrationComponent = illustrations[name]
  return <IllustrationComponent {...props} />
} 