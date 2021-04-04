'use strict';

const Service = require('egg').Service;

class Sync_userService extends Service {
  async getSyncUserInfo() {
    console.log('1111');
  }
}

module.exports = Sync_userService;
