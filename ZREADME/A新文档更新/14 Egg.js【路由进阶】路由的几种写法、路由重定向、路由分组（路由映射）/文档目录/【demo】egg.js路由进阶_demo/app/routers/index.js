'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //前台首页

  router.get('index', '/', controller.home.index);
  router.get('/shop', controller.shop.index);
  router.redirect('/news2', '/', 302);    //有利于seo优化
};