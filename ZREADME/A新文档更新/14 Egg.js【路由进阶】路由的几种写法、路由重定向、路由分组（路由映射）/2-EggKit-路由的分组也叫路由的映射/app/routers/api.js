'use strict';

/**
 * 后台 API 接口管理路由
 */

module.exports = app => {
  const { router, controller } = app;

  // TODO: API 接口
  // 用户管理API
  router.get('/api/user', controller.api.user.index);
  // 商品管理API
  router.get('/api/product', controller.api.product.index);
};
