export const a11y = {
  // Focus ring styles
  focusRing: {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
  },
  
  // Screen reader only class
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
  
  // ARIA labels
  ariaLabels: {
    main: 'Main content',
    nav: 'Main navigation',
    search: 'Search',
    menu: 'Menu',
  },
} 