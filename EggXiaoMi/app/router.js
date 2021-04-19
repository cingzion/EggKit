'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // TODO: 管理
  router.get('/admin/manager', controller.admin.manager.index); // 管理列表
  router.get('/admin/manager/add', controller.admin.manager.add); // 管理添加
  router.get('/admin/manager/edit', controller.admin.manager.edit); // 管理编辑

  // TODO: 角色
  router.get('/admin/role', controller.admin.role.index); // 角色列表
  router.get('/admin/role/add', controller.admin.role.add); // 角色添加
  router.get('/admin/role/edit', controller.admin.role.edit); // 角色编辑
  router.get('/admin/role/delete', controller.admin.role.delete); // 角色删除

  // TODO: 权限
  router.get('/admin/access', controller.admin.access.index); // 权限列表
  router.get('/admin/access/add', controller.admin.access.add); // 权限添加
  router.get('/admin/access/edit', controller.admin.access.edit); // 权限编辑
  router.get('/admin/access/delete', controller.admin.access.delete); // 权限删除

};
