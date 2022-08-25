/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:04:35
 * @FilePath: \campus-grocery-server\app\controller\handlePostList.js
 * @Description: 帖子列表相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class HandlePostListController extends Controller {
  async getPostList2() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePostList.getPostList2(body);
  }

  async getPostListNum() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.handlePostList.getPostListNum(body);
  }
}
module.exports = HandlePostListController;
