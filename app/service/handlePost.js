/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 20:22:38
 * @FilePath: \campus-grocery-server\app\service\handlePost.js
 * @Description:  操作帖子相关service
 */
'use strict';

const Service = require('egg').Service;

class HandlePostService extends Service {
  // 点赞帖子
  async supportPost(payload) {
    const { ctx, app } = this;
    const { postType, id, supportTime } = payload;
    const { telNumber, nickname } = ctx.userInfo;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      const postTelNumber = postData.telNumber;
      await app.mysqlInsert('support_list', { supportTelNumber: telNumber, supportNickname: nickname, supportTime, postTelNumber, postType, postId: id });
      ctx.helper.$success();
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 取消点赞帖子
  async cancelSupportPost(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    const { telNumber } = ctx.userInfo;
    try {
      await app.mysqlDelete('support_list', { supportTelNumber: telNumber, postType, postId: id });
      ctx.helper.$success();
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 想要
  async buyPost(payload) {
    const { ctx, app } = this;
    const { postType, id, buyTime } = payload;
    const { telNumber, nickname } = ctx.userInfo;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      const postTelNumber = postData.telNumber;
      await app.mysqlInsert('buy_list', { buyTelNumber: telNumber, buyNickname: nickname, buyTime, postTelNumber, postType, postId: id });
      ctx.helper.$success();
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 取消想要
  async cancelBuyPost(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    const { telNumber } = ctx.userInfo;
    try {
      await app.mysqlDelete('buy_list', { buyTelNumber: telNumber, postType, postId: id });
      ctx.helper.$success();
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 评论帖子
  async commentPost(payload) {
    const { ctx, app } = this;
    const { postType, id, commentTime, commentContent } = payload;
    const { telNumber, nickname, head, vip } = ctx.userInfo;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      const postTelNumber = postData.telNumber;
      let postRead = 0;
      if (telNumber === postTelNumber) {
        postRead = 1;
      }
      await app.mysqlInsert('comment_list', { commentTelNumber: telNumber, commentNickname: nickname, commentHead: head, commentVip: vip, commentTime, commentContent, postTelNumber, postType, postId: id, postRead });
      ctx.helper.$success('评论成功');
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = HandlePostService;
