const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'ReactMonthCalendar.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
};
