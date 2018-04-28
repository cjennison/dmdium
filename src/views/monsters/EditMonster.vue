<template lang="pug">
  #new-monster
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading Monster . . .
          monster-form(v-else, :monsterForm="monsterForm", formType="edit" @submit-form="createNewMonster")
</template>

<script>

import _ from 'lodash';
import MonsterForm from '@/components/monsters/MonsterForm'
import APIService from '@/services/fake-api-service';
import scope from '@/services/scope';

export default {
  name: 'new_monster',
  components: { MonsterForm },
  created() {
    this.getMonster(this.$route.params.monster_id);
  },
  data() {
    return {
      monsterForm: {},
      loading: true
    }
  },
  methods: {
    getMonster(id) {
      APIService.getMonster(id).then((monster) => {
        this.loading = false;
        this.monsterForm = _.cloneDeep(monster);
      })
    },

    createNewMonster(data) {
      console.log("Sending PUT for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${scope.current_campaign.slug}/monsters`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Monster successfully edited!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

