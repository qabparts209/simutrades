'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-white p-6',
          {
            'shadow-lg': variant === 'default',
            'border border-gray-200': variant === 'bordered',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card' 