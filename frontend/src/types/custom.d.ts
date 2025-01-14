declare module 'framer-motion' {
  export * from 'framer-motion/types'
}

declare module 'lightweight-charts' {
  export * from 'lightweight-charts/dist/typings/index'
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
} 