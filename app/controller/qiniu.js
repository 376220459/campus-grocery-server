/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 23:53:56
 * @FilePath: \campus-grocery-server\app\controller\qiniu.js
 * @Description: 七牛云相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class QiniuController extends Controller {
  async getUploadToken() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.qiniu.getUploadToken(body);
  }

  async removeImg() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.qiniu.removeImg(body);
  }
}
module.exports = QiniuController;
