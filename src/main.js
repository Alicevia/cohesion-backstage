// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
// import './permission' // permission control
// import './utils/filter' // global filter
import './components/global.less'
// import echarts from 'echarts'

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入线性图组件
require('echarts/lib/chart/line')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

store.state.projectId = Vue.ls.get('projectId')
store.state.user.token = Vue.ls.get(ACCESS_TOKEN)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
