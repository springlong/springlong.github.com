// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App'
import store from './store/store'
import router from './router/router'

// 注入 axios
// 可以使用 Vue 实例的 this.axios 或者 this.$http 访问 axios
Vue.use(VueAxios, axios)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
