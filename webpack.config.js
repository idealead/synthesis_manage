/*
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-21 10:10:31
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-24 19:50:05
 */

// webpack.config.js
module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
       options: {
         modifyVars: {
           'primary-color': '#1DA57A',
           'link-color': '#1DA57A',
           'border-radius-base': '2px',
         },
         javascriptEnabled: true,
       },
      }],
      // ...other rules
    }],
    // ...other config
  }