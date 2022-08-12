/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 01:37:11
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 03:43:06
 * @FilePath: \campus-grocery-server\app\extend\application.js
 * @Description: application 扩展文件
 */
const _ = require('lodash');

// 对象名改为snakeCase模式
function handlePayload(obj = {}) {
  const o = {};
  Object.keys(obj).forEach(item => {
    o[_.snakeCase(item)] = obj[item];
  });
  return o;
}

module.exports = {
  // 数据库插入操作
  async mysqlInsert(tableName, payload) {
    return await this.mysql.insert(tableName, handlePayload(payload));
  },

  // 数据库删除操作
  async mysqlDelete(tableName, condition) {
    return await this.mysql.delete(tableName, handlePayload(condition));
  },

  // 数据库更新操作
  async mysqlUpdate(tableName, payload, condition) {
    return await this.mysql.update(tableName, handlePayload(payload), { where: handlePayload(condition) });
  },

  // 数据库查询操作
  async mysqlGet(tableName, condition) {
    return await this.mysql.get(tableName, handlePayload(condition));
  },


  // 对象名改为snakeCase模式
  handlePayload(obj = {}) {
    const o = {};
    Object.keys(obj).forEach(item => {
      o[_.snakeCase(item)] = obj[item];
    });
    return o;
  },
};
