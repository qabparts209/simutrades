import { tokens } from './tokens'

export const theme = {
  ...tokens,
  components: {
    button: {
      variants: {
        primary: {
          backgroundColor: tokens.colors.primary[600],
          color: 'white',
          '&:hover': {
            backgroundColor: tokens.colors.primary[700],
          },
        },
        secondary: {
          backgroundColor: tokens.colors.gray[200],
          color: tokens.colors.gray[900],
          '&:hover': {
            backgroundColor: tokens.colors.gray[300],
          },
        },
      },
      sizes: {
        sm: {
          fontSize: tokens.typography.fontSize.sm,
          padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        },
        md: {
          fontSize: tokens.typography.fontSize.base,
          padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
        },
        lg: {
          fontSize: tokens.typography.fontSize.lg,
          padding: `${tokens.spacing[4]} ${tokens.spacing[8]}`,
        },
      },
    },
    input: {
      variants: {
        outline: {
          borderColor: tokens.colors.gray[300],
          '&:focus': {
            borderColor: tokens.colors.primary[500],
            boxShadow: `0 0 0 1px ${tokens.colors.primary[500]}`,
          },
        },
      },
    },
  },
} 