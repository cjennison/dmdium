<template lang="pug">
  #segments
    v-subheader Monsters for #[b &nbsp{{ campaign.name }}]
    v-layout
      v-flex(xs2 offset-xs10)
        v-spacer
        v-btn(:to="getCampaignBaseRoute() + '/monsters/new'") + Create New
    v-layout(row wrap).pa-2()
      v-flex.pa-2(xs6 v-for='monster in monsters')
        v-card.monster-card.pa-1
          v-card-media(:src="monster.image_url" height="300px")
          v-card-title.headline {{ monster.name }}
          hr
          .description.mt-3 {{ monster.description }}
          .attribute
            v-layout
              v-flex.text-xs-right.pa-2(xs3 offset-xs3) Hitpoints:
              v-flex.text-xs-left.pa-2(xs1) {{ monster.hitpoints }}
            v-layout
              v-flex.text-xs-right.pa-2(xs3 offset-xs3) Hit:
              v-flex.text-xs-left.pa-2(xs1) {{ monster.hit }}
            v-layout
              v-flex.text-xs-right.pa-2(xs3 offset-xs3) Damage:
              v-flex.text-xs-left.pa-2(xs1) {{ monster.damage }}
          v-card-actions
            v-btn(flat, :to="getCampaignBaseRoute() + '/monsters/' + monster.id + '/edit'") Edit
            v-btn(flat, class="red", @click="showConfirmDeleteDialog(monster)") Delete
      v-dialog(v-model='confirmDeleteDialog', max-width='290')
        v-card
          v-card-title.headline(v-if='confirmDeleteDialogTarget') Are you sure you want to delete this Monster: {{ confirmDeleteDialogTarget.name }}?
          v-card-text
            | You can always add it back later.
          v-card-actions
            v-spacer
            v-btn(color='orange darken-1', flat='flat', @click.native='hideConfirmDeleteDialog()') Cancel
            v-btn(color='green darken-1', flat='flat', @click.native='deleteMonster()') Yes
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'monsters',
  created() {
    this.getMonsters();
  },
  data() {
    return {
      confirmDeleteDialog: false,
      confirmDeleteDialogTarget: null,
      monsters: [],
      campaign: scope.current_campaign
    }
  },
  methods: {
    showConfirmDeleteDialog(monster) {
      this.confirmDeleteDialog = true
      this.confirmDeleteDialogTarget = monster
    },

    hideConfirmDeleteDialog(monster) {
      this.confirmDeleteDialog = false
      this.confirmDeleteDialogTarget = null
    },

    deleteMonster() {
      store.destroy('monster', this.confirmDeleteDialogTarget.id, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((result) => {
        this.hideConfirmDeleteDialog()
        this.getMonsters();
      }).catch((error) => {
        console.warn(error)
      })
    },

    getMonsters() {
      store.findAll('monster', {}, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((monsters) => {
        this.monsters = monsters;
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

