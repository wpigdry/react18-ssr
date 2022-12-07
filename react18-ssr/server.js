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

const express = require('express');
// 配置静态资源路径
const static = require('serve-static');
const webpack = require('webpack');
// 渲染的内容
const ssrRender = require('./ssrRender');

// webpack配置
const webpackConfig = require('./webpack.config');

// webpackConfig内入口文件是react前端跟节点App文件
webpack(webpackConfig, (error, status) => {
    const statusJson = status.toJson({assets: true});
    const assets = statusJson.assets.reduce((item, {name}) => {
        item[name] = `/${name}`;
        console.log(item, 'item1111111')
        return item;
    }, {});

    // 实例化express
    const app = express();

    // 路由则返回ssrRender的html
    app.get('/', (req, res) => {
        // res.send('我是页面')
        ssrRender(req, res, assets)
    });

    // 配置静态资源，管理静态文件，可通过服务器直接访问静态文件夹中的资源。路径dist为当前路径
    app.use(static('dist'));

    app.listen(8080, () => {
        console.log('react18-ssr启动成功')
    });
});
