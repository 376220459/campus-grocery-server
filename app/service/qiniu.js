/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 00:40:16
 * @FilePath: \campus-grocery-server\app\service\qiniu.js
 * @Description: 七牛云相关service
 */
'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

class QiniuService extends Service {
  async getUploadToken(payload) {
    const { ctx } = this;
    const { bucket } = payload;

    const accessKey = 'aScPp4b4WHihV2-HyEY2OtReFH1M0o5QWK09bHJw';
    const secretKey = 'jauoTrG5vzb8EHAufyjJoW7Lqs2T9dpjlxNHDq_Q';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      // 上传空间
      scope: bucket,
      // 设置token过期时间（单位:秒）
      expires: 3 * 60 * 60,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      return ctx.helper.$success('', { uploadToken });
    }
    return ctx.header.$error();
  }
}

module.exports = QiniuService;
