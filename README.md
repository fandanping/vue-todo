## webpack是什么?
模块打包机

## webpack工作方式
把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

## webpack 功能
 >source Maps
 
 >loaders
 
 > js的babel :Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：
        
        让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
        让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；
 Babel其实可以完全在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为".babelrc"的配置文件中。 我们现在的babel的配置并不算复杂，不过之后我们会再加一些东西，因此现在我们就提取出相关部分，分两个配置文件进行配置（webpack会自动调用.babelrc里的babel配置选项）
 
 >css的postcss
  
  webpack提供两个工具处理样式表css-loader和style-loader，二者处理的任务不同，css-loader使你能够使用类似@import和url(...)的方法实现require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
 
 ## 插件
 >HtmlWebpackPlugin
 
 这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。
 
 >ExtractTextPlugin：分离CSS和JS文件
 
  ## 缓存
  缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）
  
  webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
  
 
