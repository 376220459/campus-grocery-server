'use strict';

const Service = require('egg').Service;

class UserAccountService extends Service {
  async register(payload) {
    const { telNumber, password } = payload;
    try {
      const { app } = this;
      await app.mysql.insert('user_account', app.handlePayload({ telNumber, password }));
      return {
        status: 1,
        message: '注册成功',
      };
    } catch (error) {
      const { code = '' } = error;
      if (code === 'ER_DUP_ENTRY') {
        return {
          status: 0,
          message: '账号已注册',
        };
      }
      return {
        status: -1,
        error,
      };
    }
  }
}

module.exports = UserAccountService;
