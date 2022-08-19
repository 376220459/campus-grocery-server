/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 19:22:09
 * @FilePath: \campus-grocery-server\app\controller\getPost.js
 * @Description: 获取帖子（帖子列表）相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class GetPostController extends Controller {
  async getPostList() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.getPost.getPostList(body);
  }

  async getPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.getPost.getPost(body);
  }
}
module.exports = GetPostController;
