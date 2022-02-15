/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.myanimelist.in', 'cdn.anilist.co', 'cdn.myanimelist.net', 'lh3.googleusercontent.com'],
  },
}
