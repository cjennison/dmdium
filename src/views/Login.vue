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
                  v-text-field(prepend-icon='person', name='login', label='Login', type='text', v-model='loginForm.username')
                  v-text-field#password(prepend-icon='lock', name='password', label='Password', type='password', v-model='loginForm.password')
              v-card-actions
                v-spacer
                v-btn(@click="login") Login

</template>

<script>

import APIService from '@/services/fake-api-service';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      console.log("logging in", this.loginForm)
      APIService.login(this.loginForm).then((user) => {
        this.$store.commit('login', user);
        this.$router.push('/app/into-the-abyss')
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
