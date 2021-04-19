'use strict';
/**
 * 中间件：匹配路由前、匹配路由完成做的一系列的操作。 Egg 是基于 Koa 实现的，所以 Egg 的中间件形式和 Koa 的中间件形式是一样的，都是基于洋葱圈模型
 *
 * Koa中的中间件：http://eggjs.org/zh-cn/intro/egg-and-koa.html#midlleware
 *
 * Egg中的中间件： http://eggjs.org/zh-cn/basics/middleware.html
 *
 *
 *  一般来说中间件也会有自己的配置。在框架中，一个完整的中间件是包含了配置处理的。我们约定一个中间件是一个放置在 app/middleware 目录下的单独文件，它需要 exports 一个普通的 function，接受两个参数：
 *
 *  options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。
 *  app: 当前应用 Application 的实例。
 *
 *
 *  配置中间件
 */

/**
 *
 * @param options 中间件参数
 * @param app 中间件的的对象
 * @return {function(*, *): Promise<void>}
 */
module.exports = (options, app) => {
  // 打印中间件传过来的参数 options
  console.log('options=======:', options);


  // 返回一个异步的方法d
  const printDate = async (ctx, next) => {
    console.log(new Date());

    // 让程序继续向下执行就需要 调用  next() 方法
    await next();
  };

  return printDate;
};

