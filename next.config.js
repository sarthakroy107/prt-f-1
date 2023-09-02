/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pbs.twimg.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'c4.wallpaperflare.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**'
          }
        ],
      },
}

module.exports = nextConfig