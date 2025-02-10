/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'sui.io',
      'strapi-dev.scand.app',
      'file.walletapp.waveonsui.com',
      'cdn.memefi.club',
      'pntvpw2m7uxvx7j4roojxy3sb2lrc57jqzwo66kafwdjaj5v3oea.arweave.net',
      'images.hop.ag'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig
