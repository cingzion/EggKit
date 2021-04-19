'use strict';


module.exports = app => {
  const { router, controller } = app;

  /**
   * 前台首页
   */
  router.get('index', '/', controller.home.index);
  router.get('jsonp', '/jsonp', controller.jsonp.index);


};
