'use strict';

/**
 * 后台管理里的路由
 * @param app
 */
module.exports = app => {
  const { router, controller } = app;

  // TODO: 后台
  // 用户管理
  router.get('/admin/user', controller.admin.user.index);
  // 文章管理
  router.get('/admin/article', controller.admin.article.index);
  router.get('/admin/article/add', controller.admin.article.add);
  router.get('/admin/article/edit', controller.admin.article.edit);
  // 商品管理
  router.get('/admin/product', controller.admin.product.index);
  router.get('/admin/product/add', controller.admin.product.add);
  router.get('/admin/product/edit', controller.admin.product.edit);


};
