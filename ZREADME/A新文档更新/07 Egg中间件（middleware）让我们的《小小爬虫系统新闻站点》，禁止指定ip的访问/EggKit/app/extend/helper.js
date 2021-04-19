'use strict';

// 扩展里引用第三方模块
const dayjs = require('dayjs');
/**
 * https://github.com/cingzion/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
 *
 * 1、安装模块：yarn add dayjs
 *
 * 2、导入模块：const dayjs = require('dayjs');
 *
 * 3、格式化日期：dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
 *
 */


module.exports = {
  formatTime(params) {
    /**
     * helper 相当于是我们的工具类
     *
     * this 是 helper 对象，在其中可以调用其它 helper 方法
     *
     * this.ctx => context 对象
     * this.app => application 对象
     *
     *
     */

    // 格式化日期 params(时间戳)
    const dateTime = dayjs(params * 1000).format('YYYY-MM-DD HH:mm:ss');
    return dateTime;
  },
  getHelperData() {
    return '我是helper里里面的数据';
  },
};

