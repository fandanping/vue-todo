const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const Extractplugin=require('extract-text-webpack-plugin')  //分离css和js

const isDev=process.env.NODE_ENV ==='development'

const config={
    /*webpack的编译平台是web平台*/
    target:'web',
    //唯一入口文件，指定入口文件后，wepack将自动识别项目所依赖的其他文件
    entry:path.join(__dirname,'src/index.js'),
    //出口
    //__dirname 是nodejs中的一个全局变量，他指向当前执行脚本所在的目录。
    output: {
       filename:'bundle.[hash:8].js',    //打包后输出文件的文件名
        path:path.join(__dirname,'dist')  //打包后文件存放的地方
    },
    module:{
        rules:[
            /*test:一个用以匹配loaders所处理文件的扩展名的正则表达式，必须*/
            /*loader:loader名称 必须*/
            {   test:/.vue$/,  /*检验文件类型*/
                loader:'vue-loader'
            },{
                test:/\.jsx$/,
                loader:'babel-loader'
            },/*{
            /!*加载css,图片*!/
              test:/\.css$/,
              use:[
                  'style-loader',
                  'css-loader',
                  {
                      loader:'postcss-loader',
                      options:{
                          sourceMap:true
                      }
                  },
                  'stylus-loader'
              ]

            },*//*{
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },*/
            {
               test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }

                ]

            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}


if(isDev){
    //开发环境
    config.module.rules.push({
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    //生成source maps，使调试更容易
    //cheap-module-source-map :在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    //cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。
 config.devtool='#cheap-module-eval-source-map'
 //让浏览器监听代码的修改，并自动刷新显示修改后的结果
 config.devServer={
     port:'8000',
     host:'0.0.0.0',
     overlay:{
         errors:true
     }/*,
     open:true*/
    /* ,
     historyFallback:{

     }*/
    ,hot:true
 }
 config.plugins.push(
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin()
 )
}else{
 //正式环境
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash].js'
    config.module.rules.push(
        {
            test:/\.styl/,
            use:Extractplugin.extract({
                fallback:'style-loader',
                use:[

                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            })
        }
    )
    config.plugins.push(
        new Extractplugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'verdor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    )
}
module.exports=config