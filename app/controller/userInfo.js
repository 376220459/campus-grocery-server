/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 16:06:42
 * @FilePath: \campus-grocery-server\app\controller\userInfo.js
 * @Description: 用户信息相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class UserInfoController extends Controller {
  async getUserInfo() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userInfo.getUserInfo(body);
  }
}
module.exports = UserInfoController;
