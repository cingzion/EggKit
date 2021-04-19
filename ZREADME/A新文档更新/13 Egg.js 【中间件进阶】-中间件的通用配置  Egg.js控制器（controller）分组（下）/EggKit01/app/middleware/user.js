'use strict';

module.exports = (option, app) => {
  return async (ctx, next) => {
    // 实现中间件的功能
    console.log('打印日期：', new Date());

    console.log('打印中间件传参数：', option);
    await next();
  };
};
