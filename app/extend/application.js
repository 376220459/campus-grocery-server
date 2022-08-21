/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 01:37:11
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 17:39:38
 * @FilePath: \campus-grocery-server\app\extend\application.js
 * @Description: application 扩展文件
 */
const _ = require('lodash');


// 对象名改为snakeCase模式，并处理对象类型

function toSnakeCase(obj = {}) {
  const o = {};
  Object.keys(obj).forEach(item => {
    if ((obj[item] instanceof Object)) {
      o[_.snakeCase(item)] = JSON.stringify(obj[item]);
    } else {
      o[_.snakeCase(item)] = obj[item];
    }
  });
  return o;
}

// 对象名改为camelCase模式，并处理JSON类型
function toCamelCase(obj = {}) {
  const o = {};
  Object.keys(obj).forEach(item => {
    // 如果不是JSON格式，JSON.parse()方法会报错，利用这个特性对JSON格式进行转换
    try {
      o[_.camelCase(item)] = JSON.parse(obj[item]);
    } catch (error) {
      o[_.camelCase(item)] = obj[item];
    }
  });
  return o;
}

// mysql语句格式转换
function conditionHandle(condition) {
  const newCondition = toSnakeCase(condition);
  const keys = Object.keys(newCondition);
  let res = '';
  keys.forEach((key, index) => {
    if (index >= 1) {
      res += ` and ${key}="${newCondition[key]}"`;
    } else {
      res += `${key}="${newCondition[key]}"`;
    }
  });
  return res;
}

module.exports = {
  // 数据库插入操作
  async mysqlInsert(tableName, payload) {
    return await this.mysql.insert(tableName, toSnakeCase(payload));
  },

  // 数据库删除操作
  async mysqlDelete(tableName, condition) {
    return await this.mysql.delete(tableName, toSnakeCase(condition));
  },

  // 数据库更新操作
  async mysqlUpdate(tableName, payload, condition) {
    return await this.mysql.update(tableName, toSnakeCase(payload), { where: toSnakeCase(condition) });
  },

  // 数据库查询操作(查单个数据)
  async mysqlGet(tableName, condition) {
    const res = await this.mysql.get(tableName, toSnakeCase(condition));
    if (res === null) {
      return null;
    }
    return toCamelCase(res);
  },

  // 数据库查询操作(查多个数据)
  async mysqlSelect(tableName, pageNum = 1, pageSize = 10, condition = {}, orders = [[ 'id', 'desc' ]]) {
    const res = await this.mysql.select(tableName, {
      where: {
        ...toSnakeCase(condition),
      },
      limit: pageSize, // 查询条数
      offset: (pageNum - 1) * pageSize, // 数据偏移量（分页查询使用）
      orders,
    });

    if (res === null) {
      return null;
    }
    // 注意此处是多条数据（数组），所以要用map处理
    return res.map(item => toCamelCase(item));
  },

  // 数据库表记录个数查询操作
  async mysqlGetCount(tableName, condition = {}) {
    let countArr = [];
    if (_.isEmpty(condition)) {
      countArr = await this.mysql.query(`select count(*) from ${tableName}`);
    } else {
      countArr = await this.mysql.query(`select count(*) from ${tableName} where ${conditionHandle(condition)}`);
    }
    return countArr[0]['count(*)'];
  },
};
