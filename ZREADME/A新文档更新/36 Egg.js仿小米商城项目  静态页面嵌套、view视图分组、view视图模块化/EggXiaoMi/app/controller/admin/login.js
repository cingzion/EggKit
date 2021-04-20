'use strict';

/**
 * 登录控制器
 */

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 登录
  async index() {
    const { ctx } = this;

    await ctx.render('admin/login');
  }
}

module.exports = LoginController;
