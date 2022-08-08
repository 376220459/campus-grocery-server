/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-07 01:15:46
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 14:35:42
 * @FilePath: \campus-grocery-server\app\extend\helper.js
 * @Description: 扩展helper
 */
'use strict';

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = {
  // 生成登录jwt
  generateToken(data, exp) {
    const createDate = Date.now();
    let cert = '';
    try {
      cert = fs.readFileSync(path.join(__dirname, '../../keys/rsa_private_key.pem'));
    } catch (error) {
      return this.$error(error);
    }
    const token = jwt.sign(
      {
        data,
        exp: createDate + exp,
      },
      cert,
      { algorithm: 'RS256' }
    );
    return token;
  },

  // 成功响应
  $success(message = '', data = {}) {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      message,
      data,
    };
  },

  // 不符预期响应
  $warning(code, message, data = {}) {
    const { ctx } = this;
    ctx.body = {
      code,
      message,
      data,
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
