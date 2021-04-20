'use strict';

/**
 * 验证码的服务
 */

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha'); // 生成验证码用到的模块

class ToolsService extends Service {
  // 生成验证码
  async captcha() {
    const { ctx } = this;

    const captcha = svgCaptcha.create({ // 验证码的样式
      size: 6,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    }); // 创建一个验证码

    ctx.session.captcha = captcha.text; // 验证码上面的信息

    return captcha;
  }
}

module.exports = ToolsService;
