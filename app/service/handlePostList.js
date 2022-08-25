/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-25 22:14:07
 * @FilePath: \campus-grocery-server\app\service\handlePostList.js
 * @Description:  获取帖子（帖子列表）相关service
 */
'use strict';

const Service = require('egg').Service;

class HandlePostListService extends Service {
  async getPostList2(payload) {
    const { ctx, app } = this;
    const { postType, pageNum = 1, pageSize = 0, condition = {} } = payload;
    const tableName = `${postType}_posts`;
    try {
      const postList = await app.mysqlSelect(tableName, pageNum, pageSize, condition);
      const postListHandle = await Promise.all(postList.map(async postData => {
        const { postType, id, telNumber } = postData;
        try {
          const supportNum = await app.mysqlGetCount('support_list', { postType, postId: id });
          const commentNum = await app.mysqlGetCount('comment_list', { postType, postId: id });
          const userInfo = await app.mysqlGet('user_info', { telNumber });
          const { nickname } = userInfo;
          const { mainImg = null, imgs = null } = postData;
          let img = null;
          if (mainImg) {
            img = mainImg;
          } else if (imgs) {
            img = imgs[0];
          }

          return {
            ...postData,
            supportNum,
            commentNum,
            nickname,
            img,
          };
        } catch (error) {
          ctx.helper.$error(error);
        }
      }));
      ctx.helper.$success('', { postList: postListHandle });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }

  async getPostListNum(payload) {
    const { ctx, app } = this;
    const { postType } = payload;
    const tableName = `${postType}_posts`;
    try {
      const postListNum = await app.mysqlGetCount(tableName);
      ctx.helper.$success('', { postListNum });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = HandlePostListService;
