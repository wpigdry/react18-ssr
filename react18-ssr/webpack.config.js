// 打包客户端client代码
const path = require('path');

const defaultConfig = {
    mode: "development",
    devtool: "source-map",
    // 指定入口文件 关联js
    entry: {
        // 按照入口文件递归查找import相关的依赖进行打包
        'app': './src/index.js',
    },
    // 指定出口文件
    output: {
        // 打包到哪里
        path: path.resolve(__dirname, 'dist'),
        // 防止幂等问题  地址没变，文件没有更新
        // name和entry的app文件名称对应 也可以改名
        // 无变化不更新hash，读取之前的缓存文件  变化后更新hash，读取新的文件
        // 不加hash的话，更新文件后，两次访问的地址都是一样的，浏览器就会从缓存读取
        filename: '[name].[hash:8].js'
    },
    resolve: {
        // 配置省略后者名
        extensions: ['.js', '.json', '.tsx', '.jsx']
    },
    module: {
        // Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
        // 报这个错的解决方式  现在没报故注释掉
        // unknownContextCritical: false,
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 复制的
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        // 自己写的
                        // presets: [
                        //     "@babel/preset-env",
                        //     "@babel-preset-react"
                        // ],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                },
                // 排除解析node_modules的.js文件
                exclude: /node_modules/
            },
        ]
    }
}

module.exports = defaultConfig;
