module.exports = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/legacy_website',
        destination: '/legacy_website/index.html'
      }
    ]
  }
}
