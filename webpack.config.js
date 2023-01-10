const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const folders = [
  'index',
  'programme/index'
]
const mapFolders = folders.map(filename => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `./src/views/${filename}.pug`),
      filename: `${filename}.html`
  })
})

module.exports = {
mode : "development",
entry: './src/assets/js/script.js',
output: {
  filename: 'assets/js/script.js',
  path: path.resolve(__dirname, 'dist'),
  // publicPath: ''
},
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  compress: true,
  port: 3000,
},

  module: {
        rules: [
          {
            test: /\.pug$/,
            use: [
              {
                loader: 'simple-pug-loader'
              }
            ]
          },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
          {
            test: /\.(ttf|eot|otf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[name][ext]'
            }
          },
          {
            test: /\.(jpg|png|gif|webp|svg)$/,
            type: 'asset/resource',
            generator: {
              filename: 'img/[contenthash:5][ext]'
            }
          },
          {
            test: /\.webmanifest$/i,
            use: 'webpack-webmanifest-loader',
            type: 'asset/resource',
            generator: {
                filename: './[contenthash:7][ext]'
              }
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      'autoprefixer',
                    ]
                  ]
                }
              }
            }, 'sass-loader']
          }

        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'assets/style/style.css'
      })
      ].concat(mapFolders)
};