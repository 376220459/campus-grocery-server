/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 01:44:19
 * @FilePath: \campus-grocery-server\app\service\userAccount.js
 * @Description: 用户账号相关service
 */
'use strict';

const Service = require('egg').Service;

class UserAccountService extends Service {
  async register(payload) {
    const { app, ctx } = this;
    const { telNumber, password, nickname, school, identity, studentNumber, jobNumber, name, verifCode } = payload;
    if (verifCode && verifCode !== '888888') {
      return ctx.helper.$warning(3, '验证码错误');
    }

    try {
      await app.mysql.insert('user_account', app.handlePayload({ telNumber, password }));
      await app.mysql.insert('user_info', app.handlePayload({ telNumber, nickname, school, name, identity, studentNumber, jobNumber }));

      ctx.helper.$success('注册成功');
    } catch (error) {
      const { code = '' } = error;
      if (code === 'ER_DUP_ENTRY') {
        ctx.helper.$warning(2, '手机号已注册，请勿重复注册');
      } else {
        ctx.helper.$error(error);
      }
    }


  }

  async login(payload) {
    const { telNumber, password, verifCode } = payload;
    const { ctx, app } = this;
    let [ userAccount, passwordTrue ] = [ '', '' ];
    try {
      userAccount = await app.mysql.get('user_account', app.handlePayload({ telNumber }));
      userAccount && (passwordTrue = userAccount.password);
    } catch (error) {
      return ctx.helper.$error(error);
    }

    // 密码登录
    if (password && password.length) {
      if (password === passwordTrue) {
        return ctx.helper.$success('登录成功');
      }
      return ctx.helper.$warning(2, '手机号或密码错误');
    }

    // 验证码登录
    if (verifCode !== '888888') {
      return ctx.helper.$warning(3, '验证码错误');
    }

    if (userAccount) {
      return ctx.helper.$success('登录成功');
    }
    return ctx.helper.$warning(4, '此手机号未注册');
  }
}

module.exports = UserAccountService;
