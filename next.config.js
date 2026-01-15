module.exports = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paullieberman.org',
        pathname: '/sites/default/files/**',
      },
    ],
  },
  reactStrictMode: true,
}
