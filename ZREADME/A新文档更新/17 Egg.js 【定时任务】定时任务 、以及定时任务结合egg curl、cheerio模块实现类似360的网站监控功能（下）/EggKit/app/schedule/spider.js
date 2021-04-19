'use strict';
/**
 * 这里写的是一些爬虫的方法
 */

const k = 110;

// 第一种：定时任务的写法：
/* module.exports = {
  schedule: {
    interval: '5s', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const res = await ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // ++k;
    console.log('k: ', k);
    // console.log('cache: ', res.data);
    // ctx.app.cache = res.data;
  },
};*/

// 第二种：定时任务的写法：
module.exports = app => {
  return {
    schedule: {
      interval: '5s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      disable: true, // 配置该参数为 true 时，这个定时任务不会被启动。
    },
    async task(ctx) {
      // const res = await ctx.curl('http://www.api.com/cache', {
      //   dataType: 'json',
      // });
      // ++k;
      console.log('k: ', k);

      const list = await ctx.service.news.getNewsList();

      console.log('list:', list);
      // console.log('cache: ', res.data);
      // ctx.app.cache = res.data;
    },
  };
};
