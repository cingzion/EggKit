'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 注意这里是异步的，一定要在前面加  await
    await ctx.render('index', {
      title: '这是一个首页',
    });
  }
}

module.exports = HomeController;
