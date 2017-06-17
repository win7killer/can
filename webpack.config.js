const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const srcDir = path.resolve(__dirname, 'src');

module.exports = function(webpackEnv) { // 接收cli中 --env 参数，对象类型
    console.log('\n>>>>>>>>>>>>>>>>>>>>>>webpackEnv:\n', webpackEnv, '------------')

    let conf = {
        cache: true,
        context: srcDir,
        devtool: 'source-map',
        entry: {
            'entry/index': path.resolve(srcDir, 'entry/index.js')
        },
        output: {
            path: path.join(__dirname, 'can'),
            publicPath: 'can',
            filename: "[name].js",
            chunkFilename: "[chunkhash].js"
        },
        module: {
            rules: [
                {
                    test: /\.(es|js)$/,
                    exclude: /libs|node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                },
                {
                    test: /\.(css|less)$/,
                    exclude: /libs|node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                }
                            },
                            'postcss-loader',
                            'less-loader',
                        ]
                    })
                },
                {
                    test: /\.(gif|jpg|png)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 5120, //小于5K的图片base64
                                name: `[path][name].[ext]?[hash:8]`
                            }
                        },
                        // 'img-loader',
                    ]
                },
            ]
        },
        devServer: {
            contentBase: process.cwd(), //Relative directory for base of server
            host: 'www.fe.cn',
            headers: {
                'Access-Control-Allow-Origin': '*' // 字体文件跨域
            },
            publicPath: '/can/',
            hot: true,
            port: 8888,
            watchContentBase: true,
        },
        resolve: {
            alias: {
                $: 'window.$',
                src: srcDir,
                libs: srcDir + "/libs",
                img: srcDir + "/img",
                style: srcDir + '/style',
                // page: srcDir + "/page",
                entry: srcDir + "/entry",
                modules: srcDir + '/modules',
                // components: srcDir + '/components',
            }
        },
        externals: {
            // jquery: 'jQuery',
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            /* 全局变量 */
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jquery': 'jquery',
                'window.$': 'jquery',
            }),
            //清空build目录
            new CleanWebpackPlugin(['build', 'dist'], {
                root: process.cwd()
            }),
            new CopyWebpackPlugin([{
                context: srcDir,
                from: 'img',
                to: 'img'
            },{
                context: srcDir,
                from: 'libs',
                to: 'libs'
            }]),
        ]
    };

    // 压缩
    // if (env.uglify) {
    //     conf.plugins.push(
    //         new uglifyJsPlugin({
    //             compress: {
    //                 warnings: false
    //             },
    //             output: {
    //                 // 去掉注释内容
    //                 comments: false,
    //             },
    //         })
    //     )
    // }


    return conf;
};
