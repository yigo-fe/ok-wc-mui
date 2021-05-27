/*
 * @Descripttion:
 * @Author: 付静
 * @Date: 2021-05-17 10:27:33
 * @LastEditors: 付静
 * @LastEditTime: 2021-05-26 16:10:53
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
            'egoToken=dc581347-076f-45c1-be5b-c12b91a9d98e; tenant_id=test; designertoken=30b19471-7812-46f0-bff8-a5c96826d67f; local=zh-CN; Hm_lvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1621825113,1621844958,1621998268,1621998337; Hm_lpvt_6aa3bb5bcd9f8bea50e5944c4a3eb80c=1621998337',
        },
      },
    },
  },
})
