'use client'

import { SVGProps } from 'react'
import { icons, IconName } from './icons'

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
  className?: string
}

export const Icon = ({ name, size = 24, className = '', ...props }: IconProps) => {
  const IconComponent = icons[name]
  return (
    <IconComponent
      width={size}
      height={size}
      className={`fill-none stroke-current stroke-2 ${className}`}
      {...props}
    />
  )
}

Icon.displayName = 'Icon' 