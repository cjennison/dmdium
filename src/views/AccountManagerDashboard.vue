<template lang="pug">
  v-app#user-account(dark)
    v-toolbar(app fixed clipped-left)
      v-btn(flat @click="goBack()")
        v-icon arrow_left
      v-btn(to="/account") My Account
      v-btn(to="/campaigns") My Campaigns
      v-spacer
      v-btn Logout
    v-content
      v-container(fluid, fill-height, dark)
        router-view

</template>

<script>
import APIService from '@/services/fake-api-service';

export default {
  name: 'account_manager_dashboard',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
