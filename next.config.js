module.exports = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paullieberman.org',
        port: '',
        pathname: '/sites/default/files/**',
        search: '',
      },
    ],
  },
  reactStrictMode: true,
}
