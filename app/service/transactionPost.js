/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 03:27:58
 * @FilePath: \campus-grocery-server\app\service\transactionPost.js
 * @Description: 二手交易帖子相关service
 */
'use strict';

const Service = require('egg').Service;

class TransactionPostService extends Service {
  async postTransaction(payload) {
    const { ctx, app } = this;
    try {
      await app.mysqlInsert('transaction_posts', payload);
      const userInfo = await app.mysqlGet('user_info', { telNumber: payload.telNumber });
      await app.mysqlUpdate('user_info', { ledou: userInfo.ledou + 100 }, { telNumber: payload.telNumber });

      ctx.helper.$success('发布成功');
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = TransactionPostService;
