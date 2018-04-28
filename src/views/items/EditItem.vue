<template lang="pug">
  #new-item
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading Item . . .
          item-form(v-else, :itemForm="itemForm", formType="edit" @submit-form="createNewItem")
</template>

<script>

import _ from 'lodash';
import ItemForm from '@/components/items/ItemForm'
import APIService from '@/services/fake-api-service';
import scope from '@/services/scope';

export default {
  name: 'new_item',
  components: { ItemForm },
  created() {
    this.getItem(this.$route.params.item_id);
  },
  data() {
    return {
      itemForm: {},
      loading: true
    }
  },
  methods: {
    getItem(id) {
      APIService.getItem(id).then((item) => {
        console.log(item)
        this.loading = false;
        this.itemForm = _.cloneDeep(item);
      })
    },

    createNewItem(data) {
      console.log("Sending PUT for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${scope.current_campaign.slug}/items`)

        this.$notify({
          title: 'Critical Success!',
          message: 'item successfully edited!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

