/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 00:36:52
 * @FilePath: \campus-grocery-server\app\service\handlePost.js
 * @Description:  操作帖子相关service
 */
'use strict';

const Service = require('egg').Service;

class HandlePostService extends Service {
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
}

module.exports = HandlePostService;
