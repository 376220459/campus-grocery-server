/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 20:36:32
 * @FilePath: \campus-grocery-server\app\service\handlePost.js
 * @Description:  操作帖子相关service
 */
'use strict';

const Service = require('egg').Service;

class HandlePostService extends Service {
  async supportPost(payload) {
    const { ctx, app } = this;
    const { postType, id, supportTime } = payload;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      const postTelNumber = postData.telNumber;
      if (ctx.telNumber === postTelNumber) {
        return ctx.helper.$warning(2, '不可以点赞自己的帖子哦');
      }
      await app.mysqlInsert('support_list', { supportTelNumber: ctx.telNumber, supportTime, postTelNumber, postType, postId: id });
      ctx.helper.$success('感谢您的支持');
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async cancelSupportPost(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    try {
      await app.mysqlDelete('support_list', { supportTelNumber: ctx.telNumber, postType, postId: id });
      ctx.helper.$success();
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async buyPost(payload) {
    const { ctx, app } = this;
    const { postType, id, buyTime } = payload;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      const postTelNumber = postData.telNumber;
      if (ctx.telNumber === postTelNumber) {
        return ctx.helper.$warning(2, '不可以操作自己的帖子哦');
      }
      await app.mysqlInsert('buy_list', { buyTelNumber: ctx.telNumber, buyTime, postTelNumber, postType, postId: id });
      ctx.helper.$success('想要成功，快去联系宝贝主人吧');
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async cancelBuyPost(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    try {
      await app.mysqlDelete('buy_list', { buyTelNumber: ctx.telNumber, postType, postId: id });
      ctx.helper.$success('取消想要成功');
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = HandlePostService;
