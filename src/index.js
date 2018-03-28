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
  render:(h)=>h(App)
}).$mount(root)