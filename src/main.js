import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import _ from 'lodash'
import APIService from '@/services/fake-api-service'

import scope from '@/services/scope';

import './registerServiceWorker'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next();
})

console.log(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
