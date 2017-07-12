var webpack = require('webpack');
var CommonsChunkPlugin = require('.node_modules/webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
    //在webpack配置object中是通过devtool来设置sourcemap的
    //source map解决浏览器中出现问题时能够自动映射到源文件中，知道是哪个文件的哪一行出了问题。
    //source map有4种source-map，cheap-module-source-map，eval-source-map bundle，cheap-module-eval-source-map 
    //这四个选项是从上而下build速度越来越快，但是越上面的越产生没有缺点的source map
    //特别在中小型的项目中，eval-source-map是一个不错的选择，它build效率比较高，同时调试比较方便
    devtool: 'eval-source-map',
    entry: {
        about: './dist/about',
        contact:'./dist/contact'
    },
    output:{
        path: __dirname+"/build/",
        filename: "[name].bundle.js",
        //打包后静态文件存储地址
        publicPath: __dirname + "/build/assests"
    },
    devServer: {
        //true表示代码有变化就刷新
        inline: true,
        //打包后的根目录
        contentBase: './build',
        port:3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                //这个query settings可以用于传递不同的参数给loader
                query: {
                    //对于一些其他的功能和扩展要另外的安装
                    //（最常用的是babel-preset - es2015和babel - preset - react分别用于支持es6和react jsx
                    //或者选择了单独的babel配置文件'.babelrc'，来配置bebel的选项{"presets": ["react", "es2015"]}
                    presets: ["es2015", "react"]
                }
            } ,
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader:"json-loader"
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                //webpack提供了css-loader和style-loader来处理样式表。不同的loader处理不同的任务，其中css-loader处理@import和url值来解决他们的依赖关系，然后style-loader把这些计算后的样式表加到页面上。
                //总结来说呢，就是这两个loader共同实现了把样式表嵌入到webpack的js bundle中。
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(jpg|png)$/,
                // 但如果文件的体积比byte limit小，就能返回Data Url。
                //如果文件比limit（以bytes为单位）大，那么webpack就会使用file-loader去处理文件，并且所有的查询参数都会传递给file-loader
                loader: "url-loader?limit=20000&name=img/[name].[ext]'"
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: "file-loader"
            }
        ]
    },
    //resolve用于解决require模块路径问题
    resolve: {
        //extensions数组中用于配置程序可以自行补全哪些文件后缀
        //比如加载一个js文件时，只要require(‘common’)就可以加载common.js文件了
        extensions: ['', '.js', '.json'],
        //alias通过key，value的形式，将模块名和路径对应起来，不管是相对路径还是绝对路径
        //在模块引用的时候，利用require引用的模块可以不用通过相对路径或者绝对路径的方式，而是直接通过require('模块名')的方式进行引用
        alias: {
            "jquery": path.resolve(
                __dirname,
                "assets/bower_components/jquery/dist/jquery"
            ),
            "jquery_plugin": path.resolve(
                __dirname,
                'assets/javascripts/jquery_plugin'
            )
        }
    },
    //当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中
    //可以通过配置externals参数来解决这个问题,比如使用API：var jQuery = require(“jquery”);
    externals: {
        "jquery": "jQuery"
    },
    //plugins是webpack中和loader同等地位的组成部分，他可以对我们生成的文件或者我们需要怎样生成文件进行跟细致化的处理
    plugins: [
        //该插件可以对entry中入口文件中的共同部分进行分离，达到在不同页面中可以共用同一套commons.js，利用缓存减少文件从服务器中获取。
        new CommonsChunkPlugin('commons','commons.bundle.js')
    ]
}