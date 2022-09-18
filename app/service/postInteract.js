/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-20 17:09:29
 * @FilePath: \campus-grocery-server\app\service\postInteract.js
 * @Description:  帖子互动信息相关service
 */
'use strict';

const Service = require('egg').Service;

class PostInteractService extends Service {
  // 获取帖子互动基础信息
  async getPostInteract(payload) {
    const { ctx, app } = this;
    const { postType, id } = payload;
    const { telNumber } = ctx.userInfo;
    try {

      // 本人是否点赞
      const support = await app.mysqlGet('support_list', { supportTelNumber: telNumber, postType, postId: id });
      const isSupport = support !== null;

      // 本人是否购买
      const buy = await app.mysqlGet('buy_list', { buyTelNumber: telNumber, postType, postId: id });
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

  // 获取帖子点赞数
  async getPostSupportNum(payload) {
    const { ctx, app } = this;
    try {
      const postSupportNum = await app.mysqlGetCount('support_list', payload);
      ctx.helper.$success('', { postSupportNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取帖子点赞列表
  async getPostSupportList(payload) {
    const { ctx, app } = this;
    const { pageNum, pageSize, postType, postId } = payload;
    const condition = { postType, postId };
    try {
      const postSupportList = await app.mysqlSelect('support_list', pageNum, pageSize, condition);
      ctx.helper.$success('', { postSupportList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取帖子想要数
  async getPostBuyNum(payload) {
    const { ctx, app } = this;
    try {
      const postBuyNum = await app.mysqlGetCount('buy_list', payload);
      ctx.helper.$success('', { postBuyNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取帖子想要列表
  async getPostBuyList(payload) {
    const { ctx, app } = this;
    const { pageNum, pageSize, postType, postId } = payload;
    const condition = { postType, postId };
    try {
      const postBuyList = await app.mysqlSelect('buy_list', pageNum, pageSize, condition);
      ctx.helper.$success('', { postBuyList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取帖子评论数
  async getPostCommentNum(payload) {
    const { ctx, app } = this;
    try {
      const postCommentNum = await app.mysqlGetCount('comment_list', payload);
      ctx.helper.$success('', { postCommentNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  // 获取帖子评论列表
  async getPostCommentList(payload) {
    const { ctx, app } = this;
    const { pageNum, pageSize, postType, postId } = payload;
    const condition = { postType, postId };
    try {
      const postCommentList = await app.mysqlSelect('comment_list', pageNum, pageSize, condition);
      ctx.helper.$success('', { postCommentList });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = PostInteractService;
