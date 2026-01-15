
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
         protocol: 'https',
         hostname: 'paullieberman.org',
         port: '',
         pathname: '/sites/default/files/**',
      },
    ],
  },
}

module.exports = nextConfig
