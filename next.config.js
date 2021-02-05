module.exports = {
  target: "serverless",
  async rewrites() {
    return [{
      source: '/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
    }]
  },
  webpack(config, options) {
    config.plugins = config.plugins || [];
    return config;
  },
};