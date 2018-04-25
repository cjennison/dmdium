<template lang='pug'>
  v-app(id="home")
    v-toolbar(class="grey darken-3")
      v-spacer
      router-link(to="app")
        v-btn Sign Up
      router-link(to="app", v-if="!isLoggedIn")
        v-btn Login
      router-link(to="app", v-if="isLoggedIn")
        v-btn Go to Dashboard
      v-btn(flat v-if="isLoggedIn" @click="logout") Logout
    .home
      h1 DMdium
      //- img(width="600px", src='../assets/dragon-header.png')
      h4 Run the greatest Dungeons and Dragons campaign your party has ever seen.
      h4 Be ready for every turn of their adventure.

</template>

<script>

export default {
  name: 'home',
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    h1 {
      font-family: 'PT Serif', serif;
    }
  }
</style>

