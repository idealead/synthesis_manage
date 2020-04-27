/*
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-14 17:10:32
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-17 16:31:43
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false

Vue.prototype.$ajax=axios
Vue.prototype.$qs=qs

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

new Vue({
  render: h => h(App),
}).$mount('#app')
