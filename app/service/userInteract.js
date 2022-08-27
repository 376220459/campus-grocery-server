/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 18:04:31
 * @FilePath: \campus-grocery-server\app\service\userInteract.js
 * @Description:  用户互动相关service
 */
'use strict';

const Service = require('egg').Service;

class UserInteractService extends Service {
  // 获取用户点赞数
  async getUserSupportNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const userSupportNum = await app.mysqlGetCount('support_list', { supportTelNumber: telNumber });
      ctx.helper.$success('', { userSupportNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取用户评论数
  async getUserCommentNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const userCommentNum = await app.mysqlGetCount('comment_list', { commentTelNumber: telNumber });
      ctx.helper.$success('', { userCommentNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取用户求购数
  async getUserBuyNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const userBuyNum = await app.mysqlGetCount('buy_list', { buyTelNumber: telNumber });
      ctx.helper.$success('', { userBuyNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取点赞列表
  async getUserSupportList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const userSupportList = await app.mysqlSelect('support_list', pageNum, pageSize, { supportTelNumber: telNumber });

      ctx.helper.$success('', { userSupportList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取评论列表
  async getUserCommentList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const userCommentList = await app.mysqlSelect('comment_list', pageNum, pageSize, { commentTelNumber: telNumber });

      ctx.helper.$success('', { userCommentList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取求购列表
  async getUserBuyList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const userBuyList = await app.mysqlSelect('buy_list', pageNum, pageSize, { buyTelNumber: telNumber });

      ctx.helper.$success('', { userBuyList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = UserInteractService;
