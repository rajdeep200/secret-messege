/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    loader: 'imgix',
    path: 'https://example.com/myaccount/'
  }
}

module.exports = nextConfig
