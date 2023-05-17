/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Setup to repackage SVG files.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  images: {
    domains : ['imgbb.com', 'i.ibb.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/XbZFM9b/**',
      },
    ],
  },
}

module.exports = nextConfig
