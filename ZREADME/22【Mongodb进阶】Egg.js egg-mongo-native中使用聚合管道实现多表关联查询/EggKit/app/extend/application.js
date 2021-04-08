'use strict';
const ObjectId = require('mongodb').ObjectId;
// 这时对属性和方法方面的扩展
module.exports = {
  getObjectID(params) {
    // this 就是 app 对象，在其中可以调用 app 上的其它方法或者访问属性
    /**
     * 外部调用的时候：this.app.getObjectID()
     */
    return ObjectId(params);
  },
};

