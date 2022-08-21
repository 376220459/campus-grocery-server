/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 18:00:17
 * @FilePath: \campus-grocery-server\app\controller\userMessage.js
 * @Description: 用户消息相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class UserMessageController extends Controller {
  async getUnreadSupportNum() {
    const { ctx } = this;
    await ctx.service.userMessage.getUnreadSupportNum();
  }

  async getUnreadCommentNum() {
    const { ctx } = this;
    await ctx.service.userMessage.getUnreadCommentNum();
  }

  async getUnreadBuyNum() {
    const { ctx } = this;
    await ctx.service.userMessage.getUnreadBuyNum();
  }

  async getUnreadSystemMessageNum() {
    const { ctx } = this;
    await ctx.service.userMessage.getUnreadSupportNum();
  }

  async getSupportMessageList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userMessage.getSupportMessageList(body);
  }

  async getCommentMessageList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userMessage.getCommentMessageList(body);
  }

  async getBuyMessageList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userMessage.getBuyMessageList(body);
  }

  async getSystemMessageList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.userMessage.getSystemMessageList(body);
  }
}
module.exports = UserMessageController;
