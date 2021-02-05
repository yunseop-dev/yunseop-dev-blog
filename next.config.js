module.exports = {
  target: "serverless",
  async rewrites() {
    return [{
      source: '/:path*',
      destination: `http://localhost:7071/:path*`,
    }]
  },
  webpack(config, options) {
    config.plugins = config.plugins || [];
    return config;
  },
};