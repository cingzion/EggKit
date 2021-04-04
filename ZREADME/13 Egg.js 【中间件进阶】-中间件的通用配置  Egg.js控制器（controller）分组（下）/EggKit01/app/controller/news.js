'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取 home 里设置的 cookies

    const userInfo = ctx.cookies.get('username', {
      encrypt: true, // 获取的时候对 cookies 进行解密
    });
    console.log('cookiesVal:', userInfo);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      userName: userInfo,
    });
  }

}

module.exports = NewsController;
