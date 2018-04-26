<template lang='pug'>
  v-app(id="home")
    v-toolbar(class="grey darken-3")
      v-spacer
      router-link(to="app")
        v-btn Sign Up
      router-link(to="login", v-if="!user")
        v-btn Login
      router-link(to="app", v-if="user")
        v-btn Go to Dashboard
      v-btn(flat v-if="user") Logout
    .home
      h1 DMdium
      img(width="600px", src='../assets/dragon-header.png')
      h4 Run the greatest Dungeons and Dragons campaign your party has ever seen.
      h4 Be ready for every turn of their adventure.

</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      user: this.$store.getters.user
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

