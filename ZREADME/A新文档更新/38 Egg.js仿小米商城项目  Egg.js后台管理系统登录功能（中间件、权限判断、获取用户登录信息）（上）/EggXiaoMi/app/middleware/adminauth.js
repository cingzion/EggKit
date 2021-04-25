'use strict';
/**
 * 权限认证
 */

const url = require('url');

module.exports = options => {
  const adminauth = async (ctx, next) => {
    console.log('adminauth');

    /**
     * 权限判断
     * 1、用户没有登录中转到登录页面
     * 2、只有合登录以后才可以访问后台管理系统
     */

    // 安全认证
    ctx.state.csrf = ctx.csrf; // 全局变量

    const pathname = url.parse(ctx.request.url).pathname;
    console.log('pathname:', pathname);

    if (ctx.session.userinfo) { // 登录
      await next();
    } else {
      // 排除不城机做权限判断的页面 /admin/verify?mt=0.530408500198575
      const isPathName = pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify';

      if (isPathName) {
        await next();
      } else {
        // 没有登录就跳转到登录页面
        ctx.redirect('/admin/login');
      }

    }
  };
  return adminauth;
};
