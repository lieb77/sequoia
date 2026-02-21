
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
  generateBuildId: async () => {
    // This could be a git hash or a timestamp
    return 'build-id-' + Date.now();
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['live.paulleiberman.org', 'localhost:3000'],
    },
  },
}


module.exports = nextConfig
