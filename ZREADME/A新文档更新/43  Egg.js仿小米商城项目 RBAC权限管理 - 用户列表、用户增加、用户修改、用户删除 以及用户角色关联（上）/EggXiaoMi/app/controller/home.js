'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';

    await ctx.render('user', {
      title: '去登录',
      link: '/admin/login',
    });
  }
}

module.exports = HomeController;
