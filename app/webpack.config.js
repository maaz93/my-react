const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/transform-react-jsx',
                {
                  pragma: 'createElement' // default pragma is React.createElement
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  }
};
