/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 18:54:09
 * @FilePath: \campus-grocery-server\app\controller\postPost.js
 * @Description: 帖子发布相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class PostPostController extends Controller {
  async postPost() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.postPost.postPost(body);
  }
}
module.exports = PostPostController;
