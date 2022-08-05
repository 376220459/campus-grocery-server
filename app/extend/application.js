/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 01:37:11
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 01:48:38
 * @FilePath: \campus-grocery-server\app\extend\application.js
 * @Description: application 扩展文件
 */
const _ = require('lodash');

module.exports = {
  // 方法扩展
  handlePayload(obj = {}) {
    const o = {};
    Object.keys(obj).forEach(item => {
      o[_.snakeCase(item)] = obj[item];
    });
    return o;
  },
};
