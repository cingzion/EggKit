'use strict';

const Service = require('egg').Service;

/**
 * 服务之间相互调用
 */

class UserService extends Service {
  async getUserInfo() {
    return {
      name: '张三',
      age: 20,
    };
  }
}

module.exports = UserService;
