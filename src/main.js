import Vue from 'vue'
import axios from 'axios'
import router from './router'
import FastClick from 'fastclick'
import '@/styles/index.less' // global css
import * as filters from './filters' // global filters
import '@/utils/storage' // storage
import '@/utils/localStorage' // localStorage
import TopToast from './components/topToast'
import {LoadingPlugin} from 'vux'
import md5 from 'js-md5'
Vue.use(LoadingPlugin)

Vue.use(TopToast)
Vue.use(require('vue-wechat-title'))
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
FastClick.attach(document.body) // 移除移动端页面点击延迟

Vue.config.productionTip = false

Vue.prototype.$md5 = md5
new Vue({
  name: 'app',
  router,
  template: '<router-view></router-view>'
}).$mount('#app')
