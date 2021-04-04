'use strict';

module.exports = (options, app) => {
  return async (ctx, next) => {
    // 登录权验证
    /**
     * 如果 ctx.session 并且 ctx.session.userInfo 存在, 表示已经登录了，
     * 继续访问，如果 session 不存在表示没有登录，跳转到首页
     */
    if (ctx.session && ctx.session.userInfo) {
      await next(); // 就执行下一步操作
    } else {

      // 判断路由
      if (ctx.request.url === '/') {
        await next(); // 就执行下一步操作
      } else {
        ctx.redirect('/');
      }

    }
  };
};

