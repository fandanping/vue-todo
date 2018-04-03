//入口文件
import Vue from 'vue'
import App from './app.vue'
/*
import './assets/styles/test.css'
import  './assets/images/23c33fc14463b2b68f4528242994c47e.jpg'
import  './assets/images/d72f85541d70195c07c1741fe337639b.jpg'
import  './assets/styles/test-styles.styl'
*/

import './assets/styles/global.styl'

const root=document.createElement('div')
document.body.appendChild(root)
new Vue({
  render:(h)=>h(App)  /*将App渲染至根节点*/
    /*,
    render: function(h){
     h(App)
    }*/
}).$mount(root)



/*
* 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载。例如：

new Vue({
//el: '#app',
router,
render: h => h(App)
// render: x => x(App)
// 这里的render: x => x(App)是es6的写法
// 转换过来就是：  暂且可理解为是渲染App组件
// render:(function(x){
//  return x(App);
// });
}).$mount("#app");
或者
new Vue({
el: '#app',
router,
render: h => h(App)
// render: x => x(App)
// 这里的render: x => x(App)是es6的写法
// 转换过来就是：  暂且可理解为是渲染App组件
// render:(function(x){
//  return x(App);
// });
});
* */