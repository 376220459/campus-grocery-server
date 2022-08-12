/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:48:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 03:29:46
 * @FilePath: \campus-grocery-server\app\controller\transactionPost.js
 * @Description: 二手交易帖子相关接口
 */
'use strict';

const Controller = require('egg').Controller;

class TransactionPostController extends Controller {
  async postTransaction() {
    const { ctx, ctx: { request: { body } } } = this;
    await ctx.service.transactionPost.postTransaction(body);
  }
}
module.exports = TransactionPostController;
