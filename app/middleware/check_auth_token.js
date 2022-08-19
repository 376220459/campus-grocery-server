/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-08 12:37:35
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-19 21:48:47
 * @FilePath: \campus-grocery-server\app\middleware\check_auth_token.js
 * @Description: 验证auth_token中间件
 */
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async (ctx, next) => {
    const auth_token = ctx.cookies.get('auth_token', { signed: false });
    if (auth_token) {
      const jwtObj = verifyAuthToken(auth_token);
      if (jwtObj) {
        // 获取token过期时间
        const { exp, data: { telNumber } } = jwtObj;
        const nowTime = Date.now();
        if (nowTime > exp) {
          return ctx.helper.$warning(4, '您的登录信息已过期，请重新登录');
        }

        let userLoginStatus = '';
        try {
          userLoginStatus = await app.mysqlGet('user_login_token', { telNumber });
        } catch (error) {
          return ctx.helper.$error(error);
        }
        if (userLoginStatus.authToken !== auth_token) {
          return ctx.helper.$warning(5, '您的账号已经在其他地方登录，请重新登录');
        }

        // 将登录用户的个人信息存入ctx中，方便后续接口使用
        const userInfo = await app.mysqlGet('user_info', { telNumber });
        ctx.userInfo = userInfo;
        await next();
      } else {
        ctx.helper.$warning(3, '您的登录信息不合法，请重新登录');
      }
    } else {
      // 防止前端没设限制或存在漏洞
      ctx.helper.$warning(2, '用户未登录');
    }
  };
};

function verifyAuthToken(auth_token) {
  let [ publicKey, jwtObj ] = [ '', null ];
  try {
    publicKey = fs.readFileSync(path.join(__dirname, '../../keys/rsa_public_key.pem'));
    jwtObj = jwt.verify(auth_token, publicKey, { algorithms: [ 'RS256' ] });
    return jwtObj;
  } catch (error) {
    return null;
  }
}
