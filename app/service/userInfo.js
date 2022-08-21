/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 22:54:55
 * @FilePath: \campus-grocery-server\app\service\userInfo.js
 * @Description: 用户信息相关service
 */
'use strict';

const Service = require('egg').Service;

class UserInfoService extends Service {
  async getUserInfo(payload) {
    const { app, ctx } = this;
    const { telNumber } = payload;

    try {
      const userInfo = await app.mysqlGet('user_info', { telNumber });
      if (userInfo === null) {
        return ctx.helper.$warning(2, '您查寻的用户不存在');
      }
      ctx.helper.$success('', { userInfo });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = UserInfoService;
