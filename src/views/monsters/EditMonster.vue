<template lang="pug">
  #new-monster
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading Monster . . .
          monster-form(v-else, :monsterForm="monsterForm", formType="edit" @submit-form="editMonster")
</template>

<script>

import { store } from '@/services/HttpService';
import _ from 'lodash';
import MonsterForm from '@/components/monsters/MonsterForm'
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
      store.find('monster', id).then((monster) => {
        this.loading = false;
        this.monsterForm = _.cloneDeep(monster);
      })
    },

    editMonster(data) {
      console.log("Sending PUT for", data)
      store.update('monster', this.$route.params.monster_id, {
        monster: data
      }, {
        force: true
      }).then((monster) => {
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

