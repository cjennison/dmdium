<template lang="pug">
  #new-item
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          item-form(:itemForm="itemForm", @submit-form="createNewItem")
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import ItemForm from '@/components/items/ItemForm'
import scope from '@/services/scope';

export default {
  name: 'new_item',
  components: { ItemForm },
  data() {
    return {
      itemForm: {
        name: null,
        description: null
      }
    }
  },
  methods: {
    createNewItem(data) {
      console.log("Sending POST for", data)
      store.create('item', {
        item: data
      }, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((campaign) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/items`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Item successfully created!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

