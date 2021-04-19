'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    const result = await ctx.service.news.getNewsList();

    console.log('result: ', result);
    ctx.body = '你好Egg';
  }

}

module.exports = HomeController;
