const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      './icons/metamask': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/metamask.js'),
      './icons/infinitywallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/infinitywallet.js'),
      './icons/exodus': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/exodus.js'),
      './icons/frontier': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/frontier.js'),
      './icons/brave': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/brave.js'),
      './icons/binance': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/binance.js'),
      './icons/coinbase': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/coinbase.js'),
      './icons/defiwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/defiwallet.js'),
      './icons/apexwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/apexwallet.js'),
      './icons/detected': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/detected.js'),
      './icons/trust': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/trust.js'),
      './icons/opera': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/opera.js'),
      './icons/status': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/status.js'),
      './icons/alphawallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/alphawallet.js'),
      './icons/atoken': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/atoken.js'),
      './icons/bifrostwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/bifrostwallet.js'),
      './icons/bitpie': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/bitpie.js'),
      './icons/blockwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/blockwallet.js'),
      './icons/frame': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/frame.js'),
      './icons/huobiwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/huobiwallet.js'),
      './icons/hyperpay': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/hyperpay.js'),
      './icons/imtoken': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/imtoken.js'),
      './icons/liquality': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/liquality.js'),
      './icons/meetone': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/meetone.js'),
      './icons/mykey': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/mykey.js'),
      './icons/ownbit': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/ownbit.js'),
      './icons/tokenpocket': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/tokenpocket.js'),
      './icons/tp': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/tp.js'),
      './icons/xdefi': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/xdefi.js'),
      './icons/oneInch': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/oneInch.js'),
      './icons/tokenary': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/tokenary.js'),
      './icons/tallywallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/tallywallet.js'),
      './icons/zeal': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/zeal.js'),
      './icons/rabby': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/rabby.js'),
      './icons/mathwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/mathwallet.js'),
      './icons/gamestop': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/gamestop.js'),
      './icons/bitkeep': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/bitkeep.js'),
      './icons/sequence': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/sequence.js'),
      './icons/core': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/core.js'),
      './icons/bitski': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/bitski.js'),
      './icons/zerion': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/zerion.js'),
      './icons/enkrypt': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/enkrypt.js'),
      './icons/phantom': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/phantom.js'),
      './icons/safepal': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/safepal.js'),
      './icons/rainbow': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/rainbow.js'),
      './icons/okxwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/okxwallet.js'),
      './icons/safeheron': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/safeheron.js'),
      './icons/roninwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/roninwallet.js'),
      './icons/onekey': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/onekey.js'),
      './icons/fordefi': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/fordefi.js'),
      './icons/coin98wallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/coin98wallet.js'),
      './icons/kayros': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/kayros.js'),
      './icons/subwallet': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/subwallet.js'),
      './icons/talisman': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/talisman.js'),
      './icons/polkadotjs': path.resolve(__dirname, 'node_modules/@subwallet-connect/injected-wallets/dist/icons/polkadotjs.js'),
    },
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,  // To handle images like the icons
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/icons/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new NodePolyfillPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3333,
  }
};
