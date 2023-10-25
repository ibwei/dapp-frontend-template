module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh_CN'],
    localeDetection: false,
  },
  nonExplicitSupportedLngs: true,
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
