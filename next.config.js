

// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.themealdb.com',
          pathname: '/images/**',
        },
      ],
    },
  }
  