/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 21:29:09
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-18 20:37:51
 * @FilePath: \campus-grocery-server\app\router.js
 * @Description: 路由配置
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const check_auth_token = app.middleware.checkAuthToken({}, app);

  router.get('/', controller.home.index);

  // 用户账号相关接口
  router.post('/api/register', controller.userAccount.register);
  router.post('/api/login', controller.userAccount.login);
  router.post('/api/setNewPassword', controller.userAccount.setNewPassword);
  router.get('/api/checkAuthToken', check_auth_token, controller.userAccount.checkAuthToken);

  // 七牛云相关接口
  router.post('/api/getUploadToken', check_auth_token, controller.qiniu.getUploadToken);
  router.post('/api/removeImg', check_auth_token, controller.qiniu.removeImg);

  // 获取帖子相关接口
  router.post('/api/postPost', check_auth_token, controller.postPost.postPost);
  router.post('/api/getPostList', check_auth_token, controller.getPost.getPostList);
  router.post('/api/getPost', check_auth_token, controller.getPost.getPost);
  router.post('/api/getPostInteractive', check_auth_token, controller.getPost.getPostInteractive);

  // 操作帖子相关接口
  router.post('/api/supportPost', check_auth_token, controller.handlePost.supportPost);
  router.post('/api/cancelSupportPost', check_auth_token, controller.handlePost.cancelSupportPost);
  router.post('/api/buyPost', check_auth_token, controller.handlePost.buyPost);
  router.post('/api/cancelBuyPost', check_auth_token, controller.handlePost.cancelBuyPost);
};
