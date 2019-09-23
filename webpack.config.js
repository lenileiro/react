const webpack = require("webpack");

const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var nodeExternals = require('webpack-node-externals');

const browserConfig = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          "postcss-loader",
          ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new MiniCssExtractPlugin({
        filename: "public/css/style.css"
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};


var serverConfig = {
    entry: "./src/server.js",
    target: "node",
    mode: 'production',
    externals: [nodeExternals()],
    output: {
      path: __dirname,
      filename: "server.js",
      libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name: "public/media/[name].[ext]",
            publicPath: url => url.replace(/public/, ""),
            emit: false
          }
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          query: { presets: ["react-app"] }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            "postcss-loader",
            ]
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: "__isBrowser__ = false;",
        raw: true,
        include: /\.js$/
      }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new MiniCssExtractPlugin({
          filename: "public/css/style.css"
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  };

  module.exports = [browserConfig, serverConfig];