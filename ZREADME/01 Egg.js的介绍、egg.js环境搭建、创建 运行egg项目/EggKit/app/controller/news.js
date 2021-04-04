'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    await ctx.render('news', {
      title: '这是一个新闻页面',
    });
  }
}

module.exports = NewsController;
