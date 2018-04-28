<template lang='pug'>
  v-app(id="home")
    v-toolbar(class="grey darken-3")
      v-spacer
      router-link(to="register")
        v-btn Sign Up
      router-link(to="login", v-if="!user")
        v-btn Login
      router-link(to="app", v-if="user")
        v-btn Go to Dashboard
      v-btn(flat v-if="user") Logout
    .home
      v-content
        section
          v-parallax(src='https://i1.wp.com/nerdsonearth.com/wp-content/uploads/2015/05/Out-of-the-Abyss-Rage-of-Demons-cover.jpg?fit=1400%2C900&ssl=1', height='600')
            v-layout.white--text(column, align-center, justify-center)
              h1.white--text.mb-2.display-1.text-xs-center Storyteller
              .subheading.mb-3.text-xs-center DND Dungeon Master Campaign Manager
              v-btn.blue.lighten-2.mt-5(dark, large, to="register")
                | Get Started
        section
          v-layout.my-5(column, wrap, align-center)
            v-flex.my-3(xs12, sm4)
              .text-xs-center
                h2.headline The best way to run a campaign
                span.subheading
                  | Tools and libraries to guide your players
            v-flex(xs12)
              v-container(grid-list-xl)
                v-layout(row, wrap, align-center)
                  v-flex(xs12, md4)
                    v-card.elevation-0.transparent
                      v-card-text.text-xs-center
                        v-icon.blue--text.text--lighten-2(x-large) assignment
                      v-card-title.layout.justify-center(primary-title)
                        .headline.text-xs-center Campaign Manager
                      v-card-text
                        | Manage your campaign in segments.
                        | Each segment builds off of the one before it.
                        | Segments write your story for you.
                  v-flex(xs12, md4)
                    v-card.elevation-0.transparent
                      v-card-text.text-xs-center
                        v-icon.blue--text.text--lighten-2(x-large) build
                      v-card-title.layout.justify-center(primary-title)
                        .headline Entity Library
                      v-card-text
                        | Build and Manage your own monsters, items, and NPCs.
                        | Use them in your segments, track their health, usage, and dialogue.
                        | Save and share your entities with other dungeon masters.
                  v-flex(xs12, md4)
                    v-card.elevation-0.transparent
                      v-card-text.text-xs-center
                        v-icon.blue--text.text--lighten-2(x-large) flash_on
                      v-card-title.layout.justify-center(primary-title)
                        .headline.text-xs-center Prepare Faster
                      v-card-text
                        | Getting ready for the game takes time.
                        | We work with real dungeon masters to provide you
                        | with the tools you need to have an awesome campaign.
        section
          v-parallax(src='https://geekandsundry.com/wp-content/uploads/2016/03/scag_header-970x544.jpg', height='380')
            v-layout(column, align-center, justify-center)
              .headline.white--text.mb-3.text-xs-center Up your Dungeon Master game for free.
              v-btn.blue.lighten-2.mt-5(dark, large, to="register")
                | Get Started
        section
          v-container(grid-list-xl)
            v-layout.my-5(row, wrap, justify-center)
              v-flex(xs12, sm4)
                v-card.elevation-0.transparent
                  v-card-title.layout.justify-center(primary-title)
                    .headline About
                  v-card-text
                    | Storyteller is programmed and designed by Christopher Jennison.
                    | He enjoys melee classes, perfecting a dwarf accent,
                    | and failing deception checks.
        v-footer.blue.darken-2
          v-layout(row, wrap, align-center)
            v-flex(xs12)
              .white--text.ml-3
                | Made with
                v-icon.red--text favorite
                |               by 
                a.white--text(href='https://vuetifyjs.com', target='_blank') Vuetify
                |               and 
                a.white--text(href='https://github.com/vwxyzjn') Costa Huang


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

