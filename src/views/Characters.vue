<template lang="pug">
  #segments
    v-subheader NPCs for #[b &nbsp{{ campaign.name }}]
    v-layout
      v-flex(xs2 offset-xs10)
        v-spacer
        v-btn(:to="getCampaignBaseRoute() + '/npcs/new'") + Create New
    v-layout(row wrap).pa-2()
      v-flex.pa-2(xs6 v-for='character in characters')
        v-card.monster-card.pa-1
          v-card-media(:src="character.image_url" height="300px")
          v-card-title.headline {{ character.name }}
          hr
          .description.mt-3 {{ character.description }}
          .attribute
            v-layout
              v-flex.text-xs-right.pa-2(xs3 offset-xs3) Hitpoints:
              v-flex.text-xs-left.pa-2(xs1) {{ character.hitpoints }}
          v-card-actions
            v-btn(flat, :to="getCampaignBaseRoute() + '/npcs/' + character.id + '/edit'") Edit
            v-btn(flat, class="red", @click="showConfirmDeleteDialog(character)") Delete
      v-dialog(v-model='confirmDeleteDialog', max-width='290')
        v-card
          v-card-title.headline Are you sure you want to delete this NPC?
          v-card-text
            | You can always add it back later.
          v-card-actions
            v-spacer
            v-btn(color='orange darken-1', flat='flat', @click.native='hideConfirmDeleteDialog()') Cancel
            v-btn(color='green darken-1', flat='flat', @click.native='deleteCharacter()') Yes

</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'characters',
  created() {
    this.getCharacters();
  },
  data() {
    return {
      confirmDeleteDialog: false,
      confirmDeleteDialogTarget: null,
      characters: [],
      campaign: scope.current_campaign
    }
  },
  methods: {
    showConfirmDeleteDialog(character) {
      this.confirmDeleteDialog = true
      this.confirmDeleteDialogTarget = character
    },

    hideConfirmDeleteDialog(character) {
      this.confirmDeleteDialog = false
      this.confirmDeleteDialogTarget = null
    },

    deleteCharacter() {
      store.destroy('character', this.confirmDeleteDialogTarget.id, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((result) => {
        this.hideConfirmDeleteDialog()
        this.getCharacters();
      }).catch((error) => {
        console.warn(error)
      })
    },

    getCharacters() {
      store.findAll('character', {}, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((characters) => {
        this.characters = characters;
      }).catch((error) => {
        console.warn(error)
      })
    },
    
    getCampaignBaseRoute() {
      if (!this.campaign) {
        return null;
      }
      return `/app/${this.campaign.slug}`;
    }
  }
}
</script>

<style lang="scss">
  #monsters {
    .monster-card {
      min-height: 150px;
    }
  }
</style>

