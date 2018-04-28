<template lang="pug">
  v-layout(align-center, justify-center)#account
    v-flex(xs12, sm8, md4)
      v-card.elevation-12
        v-toolbar(dark)
          v-toolbar-title Account Settings
        v-card-text
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
      return this.$store.getters.getUser;
    }
  },
  methods: {
    save() {

    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
