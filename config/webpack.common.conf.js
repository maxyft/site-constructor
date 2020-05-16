const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: {
    index: `./src/main.ts`
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, `../dist/`)
  },
  mode: 'development',
  resolve: {
    modules: ['node_modules', path.resolve('../src')],
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      src: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '..'),
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
              sass: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /\.data\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.data\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: -Infinity
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
      checkSyntacticErrors: true,
      tslint: true,
      tsconfig: './tsconfig.json',
      async: true
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(`public/index.html`),
      inject: true,
      chunks: ['index']
    }),
    new CleanWebpackPlugin()
  ]
}
