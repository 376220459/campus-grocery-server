/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-27 16:48:34
 * @FilePath: \campus-grocery-server\app\service\handlePostList.js
 * @Description:  获取帖子（帖子列表）相关service
 */
'use strict';

const Service = require('egg').Service;

class HandlePostListService extends Service {
  async getPostList2(payload) {
    const { ctx, app } = this;
    const { telNumber } = ctx.userInfo;
    const { postType, pageNum = 1, pageSize = 0, searchData = '', userPostList = false, condition = {} } = payload;
    const tableName = `${postType}_posts`;
    try {
      let postList = [];
      let searchPostListNum = 0;
      let userPostListNum = 0;

      if (userPostList) {
        postList = await app.mysqlSelect(tableName, pageNum, pageSize, { telNumber });
        userPostListNum = await app.mysqlGetCount(tableName, { telNumber });

      } else if (searchData) {
        postList = await app.mysqlSearch(tableName, pageNum, pageSize, { title: searchData });
        searchPostListNum = await app.mysqlSearchCount(tableName, { title: searchData });
      } else {
        postList = await app.mysqlSelect(tableName, pageNum, pageSize, condition);
      }

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
      ctx.helper.$success('', { postList: postListHandle, searchPostListNum, userPostListNum });
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
