import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

import './styles/index.less'

// iconPark 图标库
// import { install } from '@icon-park/vue/es/all'
// install(Vue)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
