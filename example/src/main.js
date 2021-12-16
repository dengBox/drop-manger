import Vue from 'vue'
import App from '@/App.vue'
import '@/http'
import router from '@/router'
import store from '@/store'
import i18n from '@/assets/js/i18n'
import untils from '@/assets/js/until.js'
import dayjs from 'dayjs'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

// 最后引入公共样式
import './assets/scss/base.scss'

Vue.use(ViewUI)

Vue.config.productionTip = false

Vue.prototype.$dayjs = dayjs
Vue.prototype.$untils = untils

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
