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
  // 第一种：增加中间件
  router.get('/', user, controller.home.index); // 路由中使用中间件

  // 第二种：路由起名
  router.get('news', '/news', controller.news.index);

  // 使用 kon-jsonp 的中间件
  router.get('/jsonp', controller.jsonp.index);


  router.get('/loginOut', controller.home.loginOut);

  router.get('/sessions', controller.sessions.index);

  // 路由内部得定向
  router.redirect(
    '/newsinfo', // 访问的路径
    '/jsonp', // 要重定向的路径
    302 // 重定向的状态码
  );
};
