/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['src'],
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    const cssRule = config.module.rules.find((rule) => rule.test && rule.test.toString() === '/\\.module\\.(scss|sass|css)$/')

    if (cssRule) {
      cssRule.use?.forEach((loader) => {
        if (loader.loader && loader.loader.includes('/css-loader/')) {
          loader.options.modules.localIdentName = '[local]'
        }
      })
    }

    return config
  },
}

module.exports = nextConfig
