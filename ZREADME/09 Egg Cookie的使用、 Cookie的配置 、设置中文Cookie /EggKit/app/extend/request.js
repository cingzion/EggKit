'use strict';
/**
 * 外部可以通过 this.ctx.request.foo()
 */
module.exports = {
  foo(params) {
    console.log('request======:', this, params);
    return this.header.host;
  },
};
