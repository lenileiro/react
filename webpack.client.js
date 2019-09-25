const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
      },
      resolve: {
        extensions: ['.js',  '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
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
        new HtmlWebPackPlugin({
        template: './index.html'
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
            filename: "dist/css/style.css"
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}