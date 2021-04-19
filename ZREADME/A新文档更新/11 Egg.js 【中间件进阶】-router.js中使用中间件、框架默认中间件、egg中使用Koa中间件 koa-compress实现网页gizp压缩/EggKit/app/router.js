'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 在路由中获取中间件
  /**
   * 这里传了参数
   */
  const user = app.middleware.user({ title: 'this is router.js中间件' });
  router.get('/', user, controller.home.index); // 路由中使用中间件

  // 使用 kon-jsonp 的中间件
  router.get('/jsonp', controller.jsonp.index);

  router.get('/loginOut', controller.home.loginOut);
  router.get('/news', controller.news.index);
  router.get('/shop', controller.shop.index);
  router.get('/sessions', controller.sessions.index);
};
