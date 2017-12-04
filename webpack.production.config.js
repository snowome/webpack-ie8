var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // CSS单独打包 注意：package.json里的版本是："extract-text-webpack-plugin": "^1.0.1",
var HtmlWebpackPlugin = require('html-webpack-plugin');         // HTML 模板处理

/** 环境变量配置 dev / online **/
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'online';

/** 获取 HtmlWebpackPlugin 参数的方法 **/
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',      // 源文件位置
        filename: name + '.html',                      // 目标文件位置
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name],
        favicon: './src/favicon.ico'
    };
};
/** webpack config **/
var config = {
    entry: {
        'common':             ['jquery', './src/page/common/index.js'],
        'index':              ['./src/page/index/index.js'],
        'list':               ['./src/page/list/index.js'],
        'detail':             ['./src/page/detail/index.js'],
        'cart':               ['./src/page/cart/index.js'],
        'order-confirm':      ['./src/page/order-confirm/index.js'],
        'order-list':         ['./src/page/order-list/index.js'],
        'order-detail':       ['./src/page/order-detail/index.js'],
        'payment':            ['./src/page/payment/index.js'],
        'user-login':         ['./src/page/user-login/index.js'],
        'user-register':      ['./src/page/user-register/index.js'],
        'user-pass-reset':    ['./src/page/user-pass-reset/index.js'],
        'user-center':        ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update':   ['./src/page/user-pass-update/index.js'],
        'result':             ['./src/page/result/index.js']
    },

    output: {
        path: __dirname + '/dst/',
        publicPath : '//localhost/shop/dst/',
        filename: 'js/[name].js'
    },
    // externals: {
    //     'jquery': 'window.jQuery'
    // },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader?limit=2048&name=images/[name].[ext]' },
            { test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=2048&name=fonts/[name].[ext]' },
            {
                test: /\.art$/,
                loader: "html-loader",
                options: {          // 有人将options写成query(webpack1的写法?)    解决artTemplate文本框value删除引号js报错的问题，
                    minimize: true,                         // 最小化的压缩
                    removeAttributeQuotes: false            // 不删除引号
                }
            },
            {
                test: /\.string$/,
                loader: "html-loader",
                options: {          // 有人将options写成query(webpack1的写法?)    解决artTemplate文本框value删除引号js报错的问题，
                    minimize: true,                         // 最小化的压缩
                    removeAttributeQuotes: false            // 不删除引号
                }
            },
            {
                test: /\.hbs$/,
                loader: "html-loader",
                options: {          // 有人将options写成query(webpack1的写法?)    解决artTemplate文本框value删除引号js报错的问题，
                    minimize: true,                         // 最小化的压缩
                    removeAttributeQuotes: false            // 不删除引号
                }
            },
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util:         __dirname + '/src/util',
            page:         __dirname + '/src/page',
            service:      __dirname + '/src/service',
            images:       __dirname + '/src/images'
        }
    },
    plugins: [
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        /** 提取公共文件 **/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        /** CSS单独打包 **/
        new ExtractTextPlugin('css/[name].css'),
        /** HTML 模板处理 **/
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};
module.exports = config;

