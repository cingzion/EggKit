'use strict';

/**
 * 定时任务
 */

const Subscription = require('egg').Subscription;

// 第三种：定时任务的写法：
let i = 0;
class WatchFile extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {

    return {
      interval: '2s', // 多少秒
      type: 'all', // 指定所有的 worker(进程) 都需要执行
      disable: true, // 配置该参数为 true 时，这个定时任务不会被启动。
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  /**
   * 这个方法就是对 schedule() 这个定时任务的一个配置，
   * 每隔多少秒执行一次
   */
  async subscribe() {
    // 这里主是定时任务的执行操作
    // const { ctx } = this;
    /* const res = await ctx.curl('http://www.api.com/cache', {
      dataType: 'json',
    });*/
    // ctx.app.cache = res.data;
    ++i;
    console.log('i: ', i);

  }

}

module.exports = WatchFile;
