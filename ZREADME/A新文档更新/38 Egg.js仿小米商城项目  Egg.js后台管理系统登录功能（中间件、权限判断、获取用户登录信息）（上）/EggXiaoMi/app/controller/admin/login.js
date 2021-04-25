'use strict';

/**
 * 登录控制器
 */

const BaseController = require('./base');


// LoginController 继承 base.js 里的 BaseController 方法
class LoginController extends BaseController {
  // 登录
  async index() {
    const { ctx } = this;

    await ctx.render('admin/login');
  }

  // 执行登录的方法 POST 方法
  async doLogin() {
    console.log(this.ctx.request.body);

    // 调用 BaseController 里的 success 成功的方法
    await this.success('/admin/login');
  }
}

module.exports = LoginController;
