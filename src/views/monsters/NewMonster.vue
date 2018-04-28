<template lang="pug">
  #new-monster
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          monster-form(:monsterForm="monsterForm", @submit-form="createNewMonster")
</template>

<script>

import MonsterForm from '@/components/monsters/MonsterForm'
import scope from '@/services/scope';

export default {
  name: 'new_monster',
  components: { MonsterForm },
  data() {
    return {
      monsterForm: {
        name: null
      }
    }
  },
  methods: {
    createNewMonster(data) {
      console.log("Sending POST for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${scope.current_campaign.slug}/monsters`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Monster successfully created!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

