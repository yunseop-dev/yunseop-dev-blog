const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
    target: 'serverless',
    webpack(config, options) {
        config.plugins = config.plugins || []
        return config
    }
})
