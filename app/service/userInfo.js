/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-09-17 19:40:09
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

  async setUserInfo(payload) {
    const { app, ctx } = this;
    const { telNumber } = ctx.userInfo;

    try {
      await app.mysqlUpdate('user_info', payload, { telNumber });
      return ctx.helper.$success('个人信息已更新');
    } catch (error) {
      return ctx.helper.$error(error);
    }
  }
}

module.exports = UserInfoService;
