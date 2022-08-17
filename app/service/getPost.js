/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-17 23:35:57
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
      const count = await app.mysqlgetCount(tableName, condition);
      const data = { postList, count };
      ctx.helper.$success('', data);
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = GetPostService;
