module.exports = {
  images: {
    domains: ['i.imgur.com'],
  },
  webpack: (config) => {
    return {...config, externals:{sharp: 'commonjs sharp'}}
  },
}
