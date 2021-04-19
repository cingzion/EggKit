'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 注意这里是异步的，一定要在前面加  await
    await ctx.render('home');
  }

}

module.exports = HomeController;
