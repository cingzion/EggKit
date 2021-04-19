'use strict';

/**
 * 对 context 上下文趤行扩展
 * @type {{}}
 */
module.exports = {
  getHost() {
    // this 就是 ctx 对象, 在其中可以调用 ctx 上的其它方法或方问属性
    return this.request.host;
  },
};
