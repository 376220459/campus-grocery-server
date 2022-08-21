/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-21 20:12:34
 * @FilePath: \campus-grocery-server\app\service\userMessage.js
 * @Description:  帖子消息相关service
 */
'use strict';

const Service = require('egg').Service;

class UserMessageService extends Service {
  // 获取未读点赞数
  async getUnreadSupportNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const unreadSupportNum = await app.mysqlGetCount('support_list', { postTelNumber: telNumber, postRead: 0 });
      ctx.helper.$success('', { unreadSupportNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取未读评论数
  async getUnreadCommentNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const unreadCommentNum = await app.mysqlGetCount('comment_list', { postTelNumber: telNumber, postRead: 0 });
      ctx.helper.$success('', { unreadCommentNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取未读求购数
  async getUnreadBuyNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const unreadBuyNum = await app.mysqlGetCount('buy_list', { postTelNumber: telNumber, postRead: 0 });
      ctx.helper.$success('', { unreadBuyNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取未读系统消息数
  async getUnreadSystemMessageNum() {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    try {
      const unreadSystemMessageNum = app.mysqlGetCount('system_message_list', { telNumber, read: 0 });
      ctx.helper.$success('', { unreadSystemMessageNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取点赞列表
  async getSupportMessageList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const supportNum = await app.mysqlGetCount('support_list', { postTelNumber: telNumber });
      const supportList = await app.mysqlSelect('support_list', pageNum, pageSize, { postTelNumber: telNumber });
      await app.mysqlUpdate('support_list', { postRead: 1 }, { postTelNumber: telNumber, postRead: 0 });

      ctx.helper.$success('', { supportNum, supportList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取评论列表
  async getCommentMessageList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const commentNum = await app.mysqlGetCount('comment_list', { postTelNumber: telNumber });
      const commentList = await app.mysqlSelect('comment_list', pageNum, pageSize, { postTelNumber: telNumber });
      await app.mysqlUpdate('comment_list', { postRead: 1 }, { postTelNumber: telNumber, postRead: 0 });

      ctx.helper.$success('', { commentNum, commentList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  //   获取想要列表
  async getBuyMessageList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const buyNum = await app.mysqlGetCount('buy_list', { postTelNumber: telNumber });
      const buyList = await app.mysqlSelect('buy_list', pageNum, pageSize, { postTelNumber: telNumber });
      await app.mysqlUpdate('buy_list', { postRead: 1 }, { postTelNumber: telNumber, postRead: 0 });

      ctx.helper.$success('', { buyNum, buyList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  //   获取系统消息列表
  async getSystemMessageList(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { pageNum, pageSize } = payload;
    try {
      const systemMessageNum = app.mysqlGetCount('system_message_list', { telNumber });
      const systemMessageList = app.mysqlSelect('system_message_list', pageNum, pageSize, { telNumber });
      await app.mysqlUpdate('system_message_list', { read: 1 }, { telNumber, read: 0 });

      ctx.helper.$success('', { systemMessageNum, systemMessageList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = UserMessageService;
