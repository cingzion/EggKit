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

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  
  //配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    }
  };

  config.api='http://www.itying.com/api';

  return {
    ...config,
    ...userConfig,
  };
};
