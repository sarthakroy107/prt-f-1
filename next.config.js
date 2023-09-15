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
          },
          {
            protocol: 'https',
            hostname: 'static.animecorner.me',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images8.alphacoders.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images7.alphacoders.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images3.alphacoders.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images5.alphacoders.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images2.alphacoders.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'images6.alphacoders.com',
            port: '',
            pathname: '/**'
          },
        ],
      },
}

module.exports = nextConfig