var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-react.js',
    library: 'myReact',
    libraryTarget: 'umd'
  }
};
