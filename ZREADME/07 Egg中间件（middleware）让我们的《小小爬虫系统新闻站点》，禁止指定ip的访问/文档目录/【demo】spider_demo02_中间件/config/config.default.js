/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611304976808_4515';
  
  
  //配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    }
  }; 
  // 增加配置中间件
  config.middleware = ['printdate','forbidip'];

  //给printdate中间件传入的参数
  config.printdate={
    aaa:'aaaaaa'
  }

  config.forbidip={
    forbidips:[
      // '127.0.0.1',
      '192.168.0.10'
    ]
  }
  
  config.api='http://www.phonegap100.com/';
  
  
  return {
    ...config,
    ...userConfig,
  };
};
