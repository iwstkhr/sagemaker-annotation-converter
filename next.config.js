/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.REPOSITORY_NAME ? `/${process.env.REPOSITORY_NAME}` : undefined,
  assetPrefix: process.env.REPOSITORY_NAME ? `/${process.env.REPOSITORY_NAME}` : undefined,
}

module.exports = nextConfig
