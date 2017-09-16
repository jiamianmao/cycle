// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import echarts from 'echarts'

import 'common/stylus/reset.styl'
require('vue2-animate/dist/vue2-animate.min.css')

fastclick.attach(document.body)

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.use(VueLazyload, {
  loading: require('@/assets/loading.gif')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
