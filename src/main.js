import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueStore from './store'
import Vuetify from 'vuetify'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './registerServiceWorker'
import('../node_modules/vuetify/dist/vuetify.min.css')

import AuthManager from '@/services/auth-manager'
import scope from '@/services/scope'
import { store } from '@/services/HttpService'

Vue.use(Vuetify)
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!to.meta.bypassAuth) {
    const auth = AuthManager.getStoredAuth();
    if (auth.accessToken && auth.client && auth.uid) {
      if (scope.current_user) {
        next()
      } else {
        store.find('auth', null, {
          params: {
            'access-token': auth.accessToken,
            'client': auth.client,
            'uid': auth.uid
          },
          endpoint: 'auth/validate_token'
        }).then((result) => {
          scope.current_user = result.data
          next()
        }).catch((err) => {
          console.warn(err)
          next('/login')
        })
      }
    } else {
      next('/login')
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store: vueStore,
  render: h => h(App)
}).$mount('#app')
