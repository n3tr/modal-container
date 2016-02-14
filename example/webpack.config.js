var fs = require('fs')
var path = require('path')
var webpack = require('webpack')


var packagePath = path.join(__dirname, '..', 'package.json')
var packageJson = JSON.parse(String(fs.readFileSync(packagePath)))
var moduleName = packageJson.name

module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var packageSrc = path.join(__dirname,  '..', 'src')
var nodeModules = path.join(__dirname, '..', 'node_modules')
var alias = {}
alias[moduleName] = packageSrc

var fs = require('fs')
if (fs.existsSync(packageSrc) && fs.existsSync(nodeModules)) {

  // Resolve to source
  module.exports.resolve = { alias: alias }

  // Compile from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'babel' ],
    include: packageSrc
  })
}
