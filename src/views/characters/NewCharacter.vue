<template lang="pug">
  #new-character
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          character-form(:characterForm="characterForm", @submit-form="createNewcharacter")
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import CharacterForm from '@/components/characters/CharacterForm'
import scope from '@/services/scope';

export default {
  name: 'new_character',
  components: { CharacterForm },
  data() {
    return {
      characterForm: {
        name: null,
        description: null,
        hit: null,
        damage: null,
        armor_class: null
      }
    }
  },
  methods: {
    createNewcharacter(data) {
      console.log("Sending POST for", data)
      store.create('character', {
        character: data
      }, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((campaign) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/npcs`)

        this.$notify({
          title: 'Critical Success!',
          message: 'character successfully created!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

