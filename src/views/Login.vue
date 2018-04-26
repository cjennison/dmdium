<template lang="pug">
  v-app#login(dark)
    v-content
      v-container(fluid, fill-height, dark)
        v-layout(align-center, justify-center)
          v-flex(xs12, sm8, md4)
            v-card.elevation-12
              v-toolbar(dark)
                v-toolbar-title Login to your account
                v-tooltip(right)
                  v-btn(icon, large, href='https://codepen.io/johnjleider/pen/wyYVVj', target='_blank', slot='activator')
                    v-icon(large) mdi-codepen
                  span Codepen
              v-card-text
                v-form
                  v-text-field(prepend-icon='person', name='login', label='Login', type='text', v-model='loginForm.username')
                  v-text-field#password(prepend-icon='lock', name='password', label='Password', type='password', v-model='loginForm.password')
              v-card-actions
                v-spacer
                v-btn(to="app") Login

</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      }
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
