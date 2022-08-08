/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-08 14:35:25
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
      await app.mysqlInsert('user_account', { telNumber, password });
      await app.mysqlInsert('user_info', { telNumber, nickname, school, name, identity, studentNumber, jobNumber });

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
    const { telNumber, password = '', verifCode } = payload;
    const { ctx, app } = this;
    let [ userAccount, passwordTrue ] = [ '', '' ];
    try {
      userAccount = await app.mysqlGet('user_account', { telNumber });
      userAccount && (passwordTrue = userAccount.password);
    } catch (error) {
      return ctx.helper.$error(error);
    }

    // 密码登录
    if (password.length) {
      if (password === passwordTrue) {
        return await loginSuccessHandle.call(this, telNumber);
      }
      return ctx.helper.$warning(2, '手机号或密码错误');
    }

    // 验证码登录
    if (verifCode !== '888888') {
      return ctx.helper.$warning(3, '验证码错误');
    }

    if (userAccount) {
      return await loginSuccessHandle.call(this, telNumber);
    }
    return ctx.helper.$warning(4, '此手机号未注册');
  }

  async setNewPassword(payload) {
    const { telNumber, password = '', verifCode } = payload;
    const { ctx, app } = this;
    let userAccount = '';
    try {
      userAccount = await app.mysqlGet('user_account', { telNumber });
    } catch (error) {
      return ctx.helper.$error(error);
    }

    if (verifCode && verifCode.length && password.length === 0) {
      if (verifCode !== '888888') {
        return ctx.helper.$warning(3, '验证码错误');
      }
      if (userAccount) {
        return await ctx.helper.$success('验证成功');
      }
      return await ctx.helper.$warning(4, '此手机号未注册');
    }

    if (verifCode !== '888888') {
      return ctx.helper.$warning(5, '验证码已过期,请重新获取');
    }

    if (userAccount) {
      try {
        if (userAccount.password !== password) {
          await app.mysqlUpdate('user_account', { password }, { telNumber });
          return ctx.helper.$success('密码修改成功');
        }
        return ctx.helper.$warning(6, '新密码不可以和旧密码相同');
      } catch (error) {
        return ctx.helper.$error(error);
      }
    }

    return ctx.helper.$warning('坏蛋，想搞破坏！！！');

  }

  async checkAuthToken() {
    // 次验证在中间件中完成，到达此处已经是验证成功了
    const { ctx } = this;
    return ctx.helper.$success();
  }
}

async function loginSuccessHandle(telNumber) {
  const { ctx, app } = this;
  const expires = this.config.loginTokenTime;

  const auth_token = ctx.helper.generateToken({ telNumber }, expires);

  try {
    const userLoginInfo = await app.mysqlGet('user_login_token', { telNumber });
    if (userLoginInfo) {
      await app.mysqlUpdate('user_login_token', { auth_token }, { telNumber });
    } else {
      await app.mysqlInsert('user_login_token', { telNumber, auth_token });
    }
  } catch (error) {
    return ctx.helper.$error(error);
  }

  ctx.cookies.set('auth_token', auth_token, {
    maxAge: expires,
    path: '/',
    httpOnly: false,
    signed: false,
  });

  ctx.helper.$success('登录成功', { auth_token, expires });
}

module.exports = UserAccountService;
