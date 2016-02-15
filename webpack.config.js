'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV

// use for compile library use for script tag
// https://webpack.github.io/docs/library-and-externals.html
var libraryName = 'ModalContainer'
var fileName = libraryName + (env === 'production' ? '.min' : '') + '.js'

var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + "/dist",
    filename: fileName,
    library: libraryName,
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
