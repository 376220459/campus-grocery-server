/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 17:55:04
 * @FilePath: \campus-grocery-server\app\controller\userInteract.js
 * @Description: 用户账号相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class UserInteractController extends Controller {
  async getUserSupportNum() {
    const { ctx } = this;
    await ctx.service.userInteract.getUserSupportNum();
  }

  async getUserCommentNum() {
    const { ctx } = this;
    await ctx.service.userInteract.getUserCommentNum();
  }

  async getUserBuyNum() {
    const { ctx } = this;
    await ctx.service.userInteract.getUserBuyNum();
  }

  async getUserSupportList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userInteract.getUserSupportList(body);
  }

  async getUserCommentList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userInteract.getUserCommentList(body);
  }

  async getUserBuyList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userInteract.getUserBuyList(body);
  }
}

module.exports = UserInteractController;
