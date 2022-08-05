/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 01:26:05
 * @FilePath: \campus-grocery-server\app\controller\userAccount.js
 * @Description: 用户注册接口
 */
'use strict';

const Controller = require('egg').Controller;

class UserAccountController extends Controller {
  async register() {
    const { ctx, ctx: { request: { body } } } = this;
    const res = await ctx.service.userAccount.register(body);
    ctx.body = res;
  }
}
module.exports = UserAccountController;
