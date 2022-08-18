/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 19:55:59
 * @FilePath: \campus-grocery-server\app\service\getPost.js
 * @Description:  获取帖子（帖子列表）相关service
 */
'use strict';

const Service = require('egg').Service;

class GetPostService extends Service {
  async getPostList(payload) {
    const { ctx, app } = this;
    const { postType, pageNum = 1, pageSize = 10, condition = {} } = payload;
    const tableName = `${postType}_posts`;
    try {
      const postList = await app.mysqlSelect(tableName, pageNum, pageSize, condition);
      const count = await app.mysqlGetCount(tableName, condition);
      const data = { postList, count };
      ctx.helper.$success('', data);
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async getPost(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    try {
      const postData = await app.mysqlGet(`${postType}_posts`, { id });
      if (postData === null) {
        // 帖子不存在
        return ctx.helper.$warning(2);
      }
      const { telNumber } = postData;

      // 用户信息
      const userInfo = await app.mysqlGet('user_info', { telNumber });

      ctx.helper.$success('', { postData, userInfo });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async getPostInteractive(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    try {

      // 本人是否点赞
      const support = await app.mysqlGet('support_list', { supportTelNumber: ctx.telNumber, postType, postId: id });
      const isSupport = support !== null;

      // 本人是否购买
      const buy = await app.mysqlGet('buy_list', { buyTelNumber: ctx.telNumber, postType, postId: id });
      const isBought = buy !== null;


      // 帖子点赞数
      const supportNum = await app.mysqlGetCount('support_list', { postType, postId: id });

      // 帖子评论数
      const commentNum = await app.mysqlGetCount('comment_list', { postType, postId: id });

      // 帖子点赞数
      const buyNum = await app.mysqlGetCount('buy_list', { postType, postId: id });

      ctx.helper.$success('', { supportNum, commentNum, buyNum, isSupport, isBought });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = GetPostService;
