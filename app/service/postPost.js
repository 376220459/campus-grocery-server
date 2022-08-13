/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 19:15:23
 * @FilePath: \campus-grocery-server\app\service\postPost.js
 * @Description:  帖子发布相关service
 */
'use strict';

const Service = require('egg').Service;

class PostPostService extends Service {
  async postPost(payload) {
    const { ctx, app } = this;
    try {
      await app.mysqlInsert(`${payload.postType}_posts`, payload);
      const userInfo = await app.mysqlGet('user_info', { telNumber: payload.telNumber });
      if (userInfo) {
        await app.mysqlUpdate('user_info', { ledou: userInfo.ledou + 100 }, { telNumber: payload.telNumber });
      } else {
        return ctx.helper.$error();
      }
      const res = await app.mysqlGet(`${payload.postType}_posts`, { telNumber: payload.telNumber });
      ctx.helper.$success('发布成功', { res });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = PostPostService;
