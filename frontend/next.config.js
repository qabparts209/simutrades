const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

let config = nextConfig

// Only add bundle analyzer if it's installed
try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    })
    config = withBundleAnalyzer(config)
} catch (e) {
    // Bundle analyzer not installed
}

module.exports = withSentryConfig(
    config,
    {
        silent: true,
        org: "simutrades",
        project: "simutrades-frontend",
    },
    {
        widenClientFileUpload: true,
        transpileClientSDK: true,
        tunnelRoute: "/monitoring",
        hideSourceMaps: true,
        disableLogger: true,
    }
)
