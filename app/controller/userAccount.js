/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 00:12:25
 * @FilePath: \campus-grocery-server\app\controller\userAccount.js
 * @Description: 用户注册接口
 */
'use strict';

const Controller = require('egg').Controller;

class UserAccountController extends Controller {
  async register() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userAccount.register(body);
  }

  async login() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userAccount.login(body);
  }
}
module.exports = UserAccountController;
