'use strict';

// 写一个爬虫任务
const Service = require('egg').Service;

class SpiderService extends Service {
  async requestUrl(url) {
    const { ctx } = this;

    const result = await ctx.curl(url);
    return result;


  }
}

module.exports = SpiderService;
