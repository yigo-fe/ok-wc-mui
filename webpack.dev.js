/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-17 10:27:33
 * @LastEditors: 付静
 * @LastEditTime: 2021-06-16 15:50:12
 * @FilePath: /webpack.dev.js
 */
const webpack = require('webpack')
const webpackBaseConf = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
module.exports = merge(webpackBaseConf, {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8000/',
      'webpack/hot/dev-server',
      './packages/index.ts',
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
      'process.env.TEST_IE': JSON.stringify(''),
    }),
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    port: 8000,
    open: true,
    publicPath: '',
    host: '172.16.1.53',
    proxy: {
      'http://172.16.1.53:8000/apps/api/v1/private': {
        target: 'https://test.baiteda.com/',
        headers: {
          Cookie:
            'egoToken=9ec3cfbb-1ee9-4eeb-8227-b7642b16f870; designertoken=dceaa094-0637-4c16-9831-685b7c5ed57c; tenant_id=test; local=zh-CN',
        },
      },
    },
  },
})
