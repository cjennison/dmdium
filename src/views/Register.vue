<template lang="pug">
  v-app#register(dark)
    v-content
      v-container(fluid, fill-height, dark)
        v-layout(align-center, justify-center)
          v-flex(xs12, sm8, md4)
            v-card.elevation-12
              v-toolbar(dark)
                v-toolbar-title Create a New Account
              v-card-text
                v-form
                  v-text-field(prepend-icon='person', name='email', label='Email', type='email', v-model='registerForm.email')
                  v-text-field#password(prepend-icon='lock', name='password', label='Password', type='password', v-model='registerForm.password')
              v-card-actions
                v-spacer
                v-btn(@click="login") Signup

</template>

<script>

import scope from '@/services/scope'
import { store, configureStore } from '@/services/HttpService.js';
import AuthManager from '@/services/auth-manager';

export default {
  name: 'register',
  data() {
    return {
      registerForm: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      store.create('auth', { 
        email: this.registerForm.email,
        password: this.registerForm.password,
        password_confirmation: this.registerForm.password_confirmation
      }, {
        deserialize(mapper, response, opts) {
          delete opts.deserialize
          AuthManager.setStoredAuth(response.headers['access-token'], response.headers['client'], response.headers['uid'])
        }
      }).then((user) => {
        const auth = AuthManager.getStoredAuth();
        if (auth.accessToken && auth.client) {
          configureStore({
            'access-token': auth.accessToken,
            'client': auth.client,
            'uid': user.data.email
          })
          this.$router.push('/campaigns')
          scope.current_user = user.data
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
