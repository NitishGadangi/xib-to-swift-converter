const path = require('path');

module.exports = {
  mode: 'production',
  entry: './website/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fullySpecified: false,
  },
  output: {
    path: path.resolve(__dirname, './website'),
    filename: 'bundle.js',
  },
};
