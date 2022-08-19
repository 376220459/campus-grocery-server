/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 00:33:09
 * @FilePath: \campus-grocery-server\app\controller\postInteract.js
 * @Description: 帖子互动信息相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class PostInteractController extends Controller {
  async getPostInteract() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postInteract.getPostInteract(body);
  }

  async getPostSupportNum() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postInteract.getPostSupportNum(body);
  }

  async getPostSupportList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postInteract.getPostSupportList(body);
  }

  async getPostBuyNum() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postInteract.getPostBuyNum(body);
  }

  async getPostBuyList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postInteract.getPostBuyList(body);
  }
}
module.exports = PostInteractController;
