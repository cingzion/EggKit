'use strict';

const Service = require('egg').Service;

class NewService extends Service {
  async getNewsList() {
    const { ctx, config } = this;

    // 通过抓取接口返回数据

    // 在 egg 里面通过 curl 的方法可以获取运程的数据
    const api = `${config.api}/appapi.php?a=getPortalList&catid=20&page=1`;
    const response = await ctx.curl(api);
    const data = JSON.parse(response.data);

    // console.log('response=======:', data);

    return data.result;

  }

  // 获取新闻详情
  async getNewsContent(aid) {
    const { ctx, config } = this;
    // 通过抓取接口返回数据

    // 在 egg 里面通过 curl 的方法可以获取运程的数据
    const api = `${config.api}/appapi.php?a=getPortalArticle&aid=${aid}`;
    const response = await ctx.curl(api);
    const data = JSON.parse(response.data);

    // console.log('data通过抓取接口返回数据: ', data);
    return data.result;

  }
}

module.exports = NewService;
