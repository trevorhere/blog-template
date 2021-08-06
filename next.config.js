module.exports = {
  images: {
    domains: ['i.imgur.com'],
  },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
    });

    return config;
  }
}
