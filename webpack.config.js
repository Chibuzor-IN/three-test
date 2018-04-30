var path = require('path');

module.exports = {
  mode: 'production',
  entry: './main.js',  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              plugins: ['transform-class-properties']
            }
          }
        }      
    ]
  },
//   module: {
//     loaders: [{
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//             presets: ['es2015'],
//             plugins: ['transform-class-properties']
//         }
//     }]
//   }
};