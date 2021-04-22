'use strict';

/**
 * 父类
 */


const Controller = require('egg').Controller;

class BaseController extends Controller {

  // 成功
  async success(redirectUrl) {
    const { ctx } = this;

    // ctx.body = '成功';

    await ctx.render('/admin/public/success', {
      redirectUrl,
    });

  }

  // 失败
  async error(redirectUrl) {
    const { ctx } = this;

    await ctx.render('/admin/public/error', {
      redirectUrl,
    });
  }

  // 封装一个验证码
  async verify() {
    const { ctx, service } = this;

    // 调用 service 服务下面的 tools.js 里面 captcha 的生成验证码方法
    const captcha = await service.tools.captcha();
    ctx.response.type = 'image/svg+xml'; // 指定验证码，返回的类型

    console.log('验证码: ', ctx.session.captcha);

    ctx.body = captcha.data; // 给面面返回一张图片


  }


}

module.exports = BaseController;
