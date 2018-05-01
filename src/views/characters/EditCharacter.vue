<template lang="pug">
  #new-monster
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading NPC . . .
          character-form(v-else, :characterForm="characterForm", formType="edit" @submit-form="editCharacter")
</template>

<script>

import { store } from '@/services/HttpService';
import _ from 'lodash';
import CharacterForm from '@/components/characters/CharacterForm'
import scope from '@/services/scope';

export default {
  name: 'new_character',
  components: { CharacterForm },
  created() {
    this.getCharacter(this.$route.params.character_id);
  },
  data() {
    return {
      characterForm: {},
      loading: true
    }
  },
  methods: {
    getCharacter(id) {
      store.find('character', id).then((character) => {
        this.loading = false;
        this.characterForm = _.cloneDeep(character);
      })
    },

    editCharacter(data) {
      console.log("Sending PUT for", data)
      store.update('character', this.$route.params.character_id, {
        character: data
      }, {
        force: true
      }).then((character) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/characters`)

        this.$notify({
          title: 'Critical Success!',
          message: 'NPC successfully created!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

