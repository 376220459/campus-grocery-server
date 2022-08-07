/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 21:29:09
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 21:40:22
 * @FilePath: \campus-grocery-server\app\router.js
 * @Description: 路由配置
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 用户账号相关api
  router.post('/api/register', controller.userAccount.register);
  router.post('/api/login', controller.userAccount.login);
  router.post('/api/setNewPassword', controller.userAccount.setNewPassword);
  router.get('/api/checkAuthToken', controller.userAccount.checkAuthToken);
};
