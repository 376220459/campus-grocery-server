/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 21:29:09
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 00:37:07
 * @FilePath: \campus-grocery-server\config\config.default.js
 * @Description: 配置文件
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1659360521719_9803';

  // add your middleware config here
  config.middleware = [];

  // 关闭CSRF
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 链接数据库
  config.mysql = {
    app: true,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '376220459',
      database: 'campus_grocery',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
