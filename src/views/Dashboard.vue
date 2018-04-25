<template lang='pug'>
  v-app#dashboard(toolbar, footer, dark)
    v-navigation-drawer(
        clipped, 
        v-model='drawer', 
        fixed, 
        app)
      v-list(dense)
        v-list-tile(@click to="app")
          v-list-tile-action
            v-icon home
          v-list-tile-content
            v-list-tile-title Home
        v-list-tile(@click to="app")
          v-list-tile-action
            v-icon tab
          v-list-tile-content
            v-list-tile-title Segments
        v-list-tile(@click to="app")
          v-list-tile-action
            v-icon surround_sound
          v-list-tile-content
            v-list-tile-title Monsters
        v-list-tile(@click to="app")
          v-list-tile-action
            v-icon playlist_play
          v-list-tile-content
            v-list-tile-title Items
    v-toolbar(app fixed clipped-left)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title Into the Abyss
    main
      v-container(fluid)
    v-footer(app fixed)
      span.white--text © 2018
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      drawer: true
    }
  }
}
</script>

<style lang="scss">
  #dashboard {
    .list__tile__action, .list__tile__content {
      color:white !important;
    }
  }
</style>
