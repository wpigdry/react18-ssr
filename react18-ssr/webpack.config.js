// 打包客户端client代码
const path = require('path');

// 配置html压缩规则
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清理dist打包文件
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 有的旧版本不需要解构，直接const常量使用

const defaultConfig = {
    mode: "production",
    // mode: "development",
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
    },
    plugins: [
        // 清理dist文件，  会根据出口文件的名称清理掉旧的文件
        // 配合output的path设置为dist，每次打包清除dist文件夹（output不设置可能会dist文件不清理多余文件）
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 指向解析的模板地址
            // 因为配置文件在package.json中执行，所以文件路径是根目录下，'./'
            template: 'public/index.html',
            // 用于设置打包输出后的html模板名称
            filename: 'index.html', // 需要设置成public的html文件同名，才可以把打包的js链接到html
            // 设置 js 这个打包文件是否插入html
            // false会删除html中--webpack打包后引入的script标签(src指向打包后的js)，但不会删除html本身自有的script标签
            inject: true, // 默认为true  
            // 配置压缩规则
            minify: {
                html5: true, // 根据 HTML5 规范解析输入
                minifyCSS: true, // 压缩内联css
                preserveLineBreaks: true, // 当标签之间的空格包含换行符时，总是折叠到 1 个换行符（永远不要完全删除它）
                collapseWhitespace: true, // 移除空白符和换行符
                removeComments: true, // 移除html的注释
                // removeAttributeQuotes: true, // 尽可能删除属性周围的引号  
                removeEmptyAttributes: true, // 删除所有具有纯空格值的属性
                removeOptionalTags: true // 删除可选标签-- 它只去除 HTML、HEAD、BODY、THEAD、TBODY 和 TFOOT 元素的结束标签。 例如：只有末尾 </head>
            },
            // chunks表示该入口文件需要引入哪些chunk  公共的会抽离出去，（不会再次进行打包），不引入则使用不了该代码块
            // chunks，如果没有配置，那么生成的 HTML 会引入所有入口 JS 文件，在上面的例子就是，生成的两个 HTML 文件都会引入 entry.js 和 entry2.js，
            // 所以要使用 chunks 配置来指定生成的 HTML 文件应该引入哪个 JS 文件。配置了 chunks 之后，才能达到不同的 HTML 只引入对应 chunks 的 JS 文件的目的。
            /**
             * @vendor 是指提取涉及 node_modules 中的公共模块
             * @common 业务内引用的公共文件 通常指多入口共用的组件
             * @app 打包的app.js文件
             */
            chunks: ['vendor', 'common', 'app'] // 指打包生成的js文件
        }),
    ]
}

module.exports = defaultConfig;
