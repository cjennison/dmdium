<template lang="pug">
  #new-monster
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          monster-form(:monsterForm="monsterForm", @submit-form="createNewMonster")
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import MonsterForm from '@/components/monsters/MonsterForm'
import scope from '@/services/scope';

export default {
  name: 'new_monster',
  components: { MonsterForm },
  data() {
    return {
      monsterForm: {
        name: null,
        description: null,
        hit: null,
        damage: null,
        armor_class: null
      }
    }
  },
  methods: {
    createNewMonster(data) {
      console.log("Sending POST for", data)
      store.create('monster', {
        monster: data
      }, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((campaign) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/monsters`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Monster successfully created!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

