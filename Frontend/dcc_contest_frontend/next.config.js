// const withPlugins = require('next-compose-plugins')

// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const withPWAA = withPWA({
//   // next.js config
//   /** @type {import('next').NextConfig} */
//   reactStrictMode: false,
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// });

// module.exports = withPlugins([withBundleAnalyzer],
//   withPWAA
// );

/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: false,
      
};

module.exports = nextConfig;