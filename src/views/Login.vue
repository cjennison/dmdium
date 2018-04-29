<template lang="pug">
  v-app#login(dark)
    v-content
      v-container(fluid, fill-height, dark)
        v-layout(align-center, justify-center)
          v-flex(xs12, sm8, md4)
            v-card.elevation-12
              v-toolbar(dark)
                v-toolbar-title Login to your account
              v-card-text
                v-form
                  v-text-field(prepend-icon='person', name='login', label='Login', type='text', v-model='loginForm.email')
                  v-text-field#password(prepend-icon='lock', name='password', label='Password', type='password', v-model='loginForm.password')
              v-card-actions
                v-spacer
                v-btn(@click="login") Login

</template>

<script>

import { store, configureStore } from '@/services/HttpService.js';
import AuthManager from '@/services/auth-manager';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      store.create('auth', this.loginForm, {
        endpoint: 'auth/sign_in',
        deserialize(mapper, response, opts) {
          delete opts.deserialize
          AuthManager.setStoredAuth(response.headers['access-token'], response.headers['client'], response.headers['uid'])
        }
      }).then((result) => {
        const auth = AuthManager.getStoredAuth();
        if (auth.accessToken && auth.client) {
          configureStore({
            'access-token': auth.accessToken,
            'client': auth.client,
            'uid': result.email
          })
          this.$router.push('/campaigns')
          scope.current_user = result
        }
      }).catch((err) => {
        console.warn(err)
      })
    }
  }
}
</script>

<style lang="scss">
  #login {
    .input-group--dirty {
      color:white !important;
    }
  }
</style>
