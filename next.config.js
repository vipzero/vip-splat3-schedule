/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{ source: "/schedule.jpg", destination: "/api/schedule" }]
  },
}

module.exports = nextConfig
