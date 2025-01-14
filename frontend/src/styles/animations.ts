import { tokens } from './tokens'

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideIn: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
}

export const transitions = {
  default: `all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut}`,
  fast: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut}`,
  slow: `all ${tokens.animation.duration.slow} ${tokens.animation.easing.easeInOut}`,
} 