'use strict';

const { resolve } = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './app/main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      _actions: resolve(__dirname, 'app', 'actions'),
      _components: resolve(__dirname, 'app', 'components')
    }
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap'
      },
      { test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  postcss () {
    return [autoprefixer, precss];
  }
};


//https://webpack.github.io/docs/stylesheets.html