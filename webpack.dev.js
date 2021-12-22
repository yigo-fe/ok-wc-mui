/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-17 10:27:33
 * @LastEditors: 付静
 * @LastEditTime: 2021-08-12 10:03:00
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
    host: '172.16.1.133',
    proxy: {
      'http://172.16.1.133:8000/apps/api/v1/private': {
        target: 'https://test.baiteda.com/',
        headers: {
          Cookie:
            'egoToken=8bc1beea-b593-47f9-8beb-c86bce5dbcfa; designertoken=386dd47e-c8c6-48d0-9868-f85d46ffdb37; tenant_id=test; local=zh-CN',
        },
      },
    },
  },
})
