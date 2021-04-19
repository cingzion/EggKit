'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 提交数据
  router.post('/add', controller.home.add);

  router.get('/news', controller.news.index);
  router.get('/newscontent', controller.news.content);
};
