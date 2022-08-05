/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 21:29:09
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 01:23:16
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
  router.post('/register', controller.userAccount.register);
};
