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
  config.keys = appInfo.name + '_1579072900094_7400';

  // add your middleware config here

  // 路由制作了需要在中间层去配置
   config.middleware = ['adminauth'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }
  config.security = {
    csrf:{enable: false},
    domainWhiteList:['*']
  };
  config.cors = {
    origin:'http://localhost:3000',
    // credentials: true, //开启认证 这样前后台能共享session
    credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }


  return {
    ...config,
    ...userConfig,
  };
};
