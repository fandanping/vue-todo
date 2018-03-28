const autoprefixer=require('autoprefixer')
/*在webpack配置文件中添加postcss-loader，在根目录新建postcss.config.js,并添加如下代码之后，重新使用npm start打包时，你写的css会自动根据Can i use里的数据添加不同前缀了*/
module.exports={
    plugins:[
        autoprefixer()
    ]
}