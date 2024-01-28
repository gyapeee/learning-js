const path = require('path');

module.exports = {
  // A belépési pont, ahonnan a Webpack elkezdi a kódod feldolgozását
  entry: './src/index.js',

  // A kimeneti fájl neve és útvonala, amelybe a Webpack becsomagolja a kódodat
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // A modulok szabályai, amelyek meghatározzák, hogy milyen betöltőket használjon a Webpack a különböző fájltípusokra
  module: {
    rules: [
      {
        // A fájlok kiterjesztése, amelyekre a szabály vonatkozik
        test: /\.js$/,
        // A kizárt mappák, amelyekre a szabály nem vonatkozik
        exclude: /node_modules/,
        // A használt betöltő, amely a Babel-t használja a JavaScript kód lefordításához
        use: 'babel-loader'
      }
    ]
  },

  // A fejlesztői szerver beállításai, amely segít a kódod gyors tesztelésében és frissítésében
  devServer: {
    // A mappa, ahonnan a Webpack szolgálja ki a kimeneti fájlt
    contentBase: './dist'
  }
};
