import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './registerServiceWorker'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(ElementUI)

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
