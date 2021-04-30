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

    // 安全认证，用来解决 post 提交
    ctx.state.csrf = ctx.csrf; // 全局变量
    // 这是保存上一页的地址 ctx.request.headers['referer']
    ctx.state.prevPage = ctx.request.headers.referer;

    // /admin/verify?mt=0.530408500198575 转换成 /admin/verify 这样的地址才好拿来做做判断
    const pathname = url.parse(ctx.request.url).pathname;

    if (ctx.session.userinfo) { // 登录成功就向下执行

      ctx.state.userinfo = ctx.session.userinfo; // 表示全局变量
      await next();
    } else { // 登录失败就执行以下的操作
      // 排除不城机做权限判断的页面 /admin/verify?mt=0.530408500198575
      const isPathName = pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify';

      if (isPathName) { // 如果用户已登录就就向下执行
        await next();
      } else { // 如果用户没有登录就跳转到登录的页面
        // 没有登录就跳转到登录页面
        ctx.redirect('/admin/login');
      }

    }
  };
  return adminauth;
};
