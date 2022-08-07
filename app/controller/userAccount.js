/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 22:53:33
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

  async setNewPassword() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userAccount.setNewPassword(body);
  }

  async checkAuthToken() {
    // auth_token存在cookie中，后端也能取到，所以此接口不用传参
    const { ctx } = this;
    await ctx.service.userAccount.checkAuthToken();
  }
}
module.exports = UserAccountController;
