/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-07 01:15:46
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 01:19:13
 * @FilePath: \campus-grocery-server\app\extend\helper.js
 * @Description: 扩展helper
 */
'use strict';

module.exports = {
  // 成功响应
  $success(message) {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      message,
    };
  },

  // 不符预期响应
  $warning(code, message) {
    const { ctx } = this;
    ctx.body = {
      code,
      message,
    };
  },

  // 错误响应
  $error(error) {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      error,
    };
  },
};
