/** @type {import('next').NextConfig} */

if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{ source: "/schedule.jpg", destination: "/api/schedule" }]
  },
}

module.exports = nextConfig
