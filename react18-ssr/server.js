/**
 * @file ssr node服务启动文件
 */

// 底层改写了 node 的 require 方法, 运行时即时编译来支持 ES6 模块化语法
const register = require('@babel/register');
// @babel/preset-env  es语法编译
// @babel/preset-react  编译react语法
// @babel/plugin-transform-modules-commonjs 该插件将 ECMAScript 模块转换为CommonJS
register({
    ignore: [/node_modules/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
});

