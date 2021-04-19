'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;

    // 获取数据显示到新闻页面

    // 调用  service 的方法
    const lists = await ctx.service.news.getNewsList();
    console.log('list: ', lists);
    await ctx.render('news', {
      title: '这是一个新闻页面',
      lists,
    });

  }

  async content() {
    // 获取 get 传值
    const { ctx } = this;
    const aid = ctx.query.aid;
    console.log('aid:', aid);

    // 获取 service 服务的数据
    const data = await ctx.service.news.getNewsContent(aid);

    console.log('======99999:', data);

    await ctx.render('newscontent', {
      title: '新闻详情',
      list: data[0],
    });


  }
}

module.exports = NewsController;
