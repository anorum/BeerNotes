const withCSS = require('@zeit/next-css')
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))


    return config
  },
  cssLoaderOptions: {
    url: false
    }
})
