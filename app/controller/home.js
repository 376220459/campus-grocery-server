/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-01 21:29:09
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 00:48:17
 * @FilePath: \campus-grocery-server\app\controller\home.js
 * @Description:
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '欢迎来到campus-grocery';
  }
}

module.exports = HomeController;
