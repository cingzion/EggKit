'use strict';
/**
 * 使用中间件，屏蔽指定的 ip 地址
 */

/*
module.exports = (options, app) => {
  console.log('options:', options);

  // 返回一个异步的方法
  return async (ctx, next) => {
    // 要屏蔽的id: 1、从数据库获取, 2、从参数传入

    // 要屏蔽的ip
    const forbidip = '127.0.0.1';

    // 获取客户端的ip
    // console.log('获取客户端的ip: ', ctx.request.ip);

    if (ctx.request.ip === forbidip) {
      ctx.status = 403;
      ctx.body = '你的ip已经被屏蔽';
    } else {
      await next();
    }


  };
};
*/

// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {
  console.log('options======:', options);
  // options======: { forbidips: [ '127.0.0.1', '192.168.8.102' ] }

  // 返回一个异步的方法
  return async (ctx, next) => {
    // 要屏蔽的id: 1、从数据库获取, 2、从参数传入

    // 要屏蔽的ip
    const forbidip = options.forbidips;

    // 获取客户端的ip
    const clientIp = ctx.request.ip;

    // console.log('获取客户端的ip: ', ctx.request.ip);
    // 循环遍历里的Ip
    /**
     * some 和 forEach 相似
     *
     * some里的参数，就是只要数组城有一个满足就等于 true，然后就啥都不做了
     */
    // eslint-disable-next-line array-callback-return
    const hasIp = forbidip.some(val => {

      console.log('==========88888: ', val);
      // 如果返回 true 就表示屏蔽
      if (val === clientIp) return true;
    });

    if (hasIp) {
      // 打印出屏弊的信息
      ctx.status = 403;
      ctx.body = '您的 IP 已经被屏蔽';
    } else {
      await next();
    }

  };
};

