'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

 //api接口
  router.get('/api/user', controller.api.user.index);  
  router.get('/api/product', controller.api.product.index);
};


