import Vue from 'vue'
import App from './App'
import { router } from './router'
import store from './store'
import { Upload } from 'element-ui'
import request from './utils/request'

import buttomnav from './view/buttomnav/index'
Vue.component('buttom-nav', buttomnav)

Vue.use(Upload)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

window.fnback = function() {
  history.pushState(null, null, window.origin)
}
window.backhome = function() {
  window.location.replace(window.origin)
}

Vue.prototype.$http = request

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
