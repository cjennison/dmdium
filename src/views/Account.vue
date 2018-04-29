<template lang="pug">
  v-layout(align-center, justify-center)#account
    v-flex(xs12, sm8, md4)
      v-card.elevation-12
        v-toolbar(dark)
          v-toolbar-title Account Settings
        v-card-text
          v-alert(type="info" value="true") Warning: For security, changing settings here will log you out. You will need to log back in after saving.
          v-divider
          v-form
            v-layout
              v-flex.pa-1(xs6)
                v-text-field(prepend-icon='person', name='first_name', label='First Name', type='text', v-model='accountForm.first_name')
              v-flex.pa-1(xs6)
                v-text-field(name='last_name', label='Last Name', type='text', v-model='accountForm.last_name')
            v-divider
        v-card-actions
          v-spacer
          v-btn(@click="save") Save

</template>

<script>
import scope from '@/services/scope'
import { store } from '@/services/HttpService'

export default {
  name: 'user_account',
  created() {
    this.accountForm.first_name = this.user.first_name;
    this.accountForm.last_name = this.user.last_name;
  },
  data() {
    return {
      accountForm: {}
    }
  },
  computed: {
    user() {
      return scope.current_user;
    }
  },
  methods: {
    save() {
      store.update('user', this.user.id, {
        user: this.accountForm
      }).then((user) => {
        this.$router.push('/login')
        scope.current_user = user
      }).catch((err) => {
        console.warn(err)
      })
    }
  }
}
</script>
