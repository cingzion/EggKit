'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //路由中获取中间件

  // var auth=app.middleware.auth({title:'this is router.js  middleware'})

  //前台首页
  router.get('/', controller.home.index);  
  router.get('/news', controller.news.index);
  router.get('/shop', controller.shop.index);
};


