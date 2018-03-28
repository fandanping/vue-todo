const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const Extractplugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV ==='development'

const config={
    /*webpack的编译平台是web平台*/
    target:'web',
    //入口
    entry:path.join(__dirname,'src/index.js'),
    //出口
    output: {
       filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
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
 config.devtool='#cheap-module-eval-source-map'
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