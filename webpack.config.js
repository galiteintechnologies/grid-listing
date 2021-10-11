const path = require('path');

module.exports = {
    entry: "./src/GridComponent.jsx",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "GridComponent.jsx",
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
};