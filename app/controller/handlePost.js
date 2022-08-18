/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 20:31:52
 * @FilePath: \campus-grocery-server\app\controller\handlePost.js
 * @Description: 操作帖子相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class HandlePostController extends Controller {
  async supportPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePost.supportPost(body);
  }

  async cancelSupportPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePost.cancelSupportPost(body);
  }

  async buyPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePost.buyPost(body);
  }

  async cancelBuyPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePost.cancelBuyPost(body);
  }
}
module.exports = HandlePostController;
