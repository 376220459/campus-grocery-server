/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 00:51:05
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-13 00:23:41
 * @FilePath: \campus-grocery-server\app\service\qiniu.js
 * @Description: 七牛云相关service
 */
'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');
const { accessKey, secretKey } = require('../../keys/qiniu');

class QiniuService extends Service {
  async getUploadToken(payload) {
    const { ctx } = this;
    const { bucket } = payload;
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

  async removeImg(payload) {
    const { ctx } = this;
    const { bucket, key } = payload;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();

    // 华北-河北空间代码为z1
    config.zone = qiniu.zone.Zone_z1;
    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    // 此处是操作是异步操作，必须使用Promise
    await new Promise((resolve, reject) => {
      bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
        if (respInfo.status === 200) {
          resolve();
        } else {
          reject(err);
        }
      });
    }).then(() => {
      ctx.helper.$success('图片删除成功');
    }).catch(() => {
      return ctx.header.$error();
    });
  }
}

module.exports = QiniuService;
