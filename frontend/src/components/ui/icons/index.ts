import { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

export const icons = {
  // Navigation
  home: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),

  // Actions
  close: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),

  // Status
  loading: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  )
} as const

export type IconName = keyof typeof icons 