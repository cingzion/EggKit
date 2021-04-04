'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 路由中配置中间件
  const admnAuth = app.middleware.adminAuth();


  // TODO: 后台
  // 用户管理
  router.get('/admin/user', admnAuth, controller.admin.user.index);
  // 文章管理
  router.get('/admin/article', admnAuth, controller.admin.article.index);
  router.get('/admin/article/add', admnAuth, controller.admin.article.add);
  router.get('/admin/article/edit', admnAuth, controller.admin.article.edit);
  // 商品管理
  router.get('/admin/product', controller.admin.product.index);
  router.get('/admin/product/add', controller.admin.product.add);
  router.get('/admin/product/edit', controller.admin.product.edit);

  // TODO: API 接口
  // 用户管理API
  router.get('/api/user', controller.api.user.index);
  // 商品管理API
  router.get('/api/product', controller.api.product.index);


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
