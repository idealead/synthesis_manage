/*
 * @Descripttion: 
 * @version: 
 * @Author: xiaoka
 * @Date: 2020-04-14 17:10:32
 * @LastEditors: xiaoka
 * @LastEditTime: 2020-04-26 10:12:28
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import qs from 'qs'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$ajax=axios
Vue.prototype.$qs=qs

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

new Vue({
  render: h => h(App),
}).$mount('#app')
