'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用 service 服务里的方法
    const list = await ctx.service.news.getNewsList();
    const getUserInfo = await ctx.service.user.getUserInfo();

    const getSyncUserInfo = await ctx.service.syncUser.getSyncUserInfo();


    console.log('==============', getSyncUserInfo);
    console.log('res:', list);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      list,
      getUserInfo,
    });
  }
}

module.exports = NewsController;
