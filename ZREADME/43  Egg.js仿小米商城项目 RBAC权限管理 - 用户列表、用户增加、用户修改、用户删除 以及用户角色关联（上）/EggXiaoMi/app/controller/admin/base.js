'use strict';

/**
 * 父类
 */


const Controller = require('egg').Controller;

class BaseController extends Controller {

  // 成功
  async success(redirectUrl, msg) {
    const { ctx } = this;

    // ctx.body = '成功';

    await ctx.render('/admin/public/success', {
      redirectUrl,
      message: msg || '操作成功!',
    });

  }

  // 失败
  async error(redirectUrl, msg) {
    const { ctx } = this;

    await ctx.render('/admin/public/error', {
      redirectUrl,
      message: msg || '操作成功!',
    });
  }

  // 封装一个验证码
  async verify() {
    const { ctx, service } = this;

    // 调用 service 服务下面的 tools.js 里面 captcha 的生成验证码方法
    const captcha = await service.tools.captcha();
    ctx.response.type = 'image/svg+xml'; // 指定验证码，返回的类型

    console.log('验证码: ', ctx.session.code.toUpperCase());

    // const result = await this.ctx.model.Admin.find({ username: 'admin', password: 'admin' }); // 查询数据库
    // console.log('测试数据：', result);

    ctx.body = captcha.data; // 给面面返回一张图片


  }

  // 封装一个公共的删除方法
  async delete() {
    const { ctx } = this;
    /**
     * 1、获取要删除的数据库表 model
     *
     * 2、获取要删除数据的 id    _id
     *
     * 3、执行删除
     *
     * 4、返回到以前的页面 ctx.request.headers['referer'] (上一页的地址)
     *
     */

    // 1、获取要删除的数据库表 model
    const model = ctx.request.query.model; // 获取模型 Role

    // 2、获取要删除数据的 id    _id
    const id = ctx.request.query.id;

    // 3、执行删除
    await ctx.model[model].deleteOne({ _id: id }); // 注意

    // 4、返回到以前的页面, 从哪里来回到哪去，这是保存上一页的地址：ctx.request.headers['referer'], 我们把这个方到中间件里，保存一个全局变量，方便调用
    // ctx.redirect(ctx.request.headers.referer);
    ctx.redirect(ctx.state.prevPage); // 在中间件里调用


  }


}

module.exports = BaseController;
