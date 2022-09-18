/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-13 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-23 19:58:17
 * @FilePath: \campus-grocery-server\app\service\postPost.js
 * @Description:  帖子发布相关service
 */
'use strict';

const Service = require('egg').Service;

class PostPostService extends Service {
  async postPost(payload) {
    const { ctx, app } = this;
    try {
      const insertData = await app.mysqlInsert(`${payload.postType}_posts`, payload);
      const { insertId } = insertData;
      const userInfo = await app.mysqlGet('user_info', { telNumber: payload.telNumber });
      if (userInfo) {
        await app.mysqlUpdate('user_info', { ledou: userInfo.ledou + 100 }, { telNumber: payload.telNumber });
      } else {
        return ctx.helper.$error();
      }
      const postData = await app.mysqlGet(`${payload.postType}_posts`, { id: insertId });

      // 发布成功后，发送一条系统消息
      const currentTime = await app.getCurrentTime();
      await app.mysqlInsert('system_message_list', { telNumber: userInfo.telNumber, time: currentTime, title: '发帖奖励', content: '恭喜你，成功发布一条帖子，系统奖励：乐豆+100，再接再厉！' });
      ctx.helper.$success('发布成功', { postData });
    } catch (error) {
      ctx.helper.$error(error);
    }
  }
}

module.exports = PostPostService;
