'use strict';
/**
 * 外部可以通过 this.app.foo() 来调用这里的方法
 *
 */

// application 扩展
module.exports = {
  foo(params) {
    // this 就是 app 对象，在其中可以调用 app 上的其它方法或访问属性
    console.log('========');
    console.log(params, this);

    return this.config.api;
  },
};
