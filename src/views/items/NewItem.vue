<template lang="pug">
  #new-item
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          item-form(:itemForm="itemForm", @submit-form="createNewItem")
</template>

<script>

import ItemForm from '@/components/items/ItemForm'
import scope from '@/services/scope';

export default {
  name: 'new_item',
  components: { ItemForm },
  data() {
    return {
      itemForm: {
        name: null
      }
    }
  },
  methods: {
    createNewItem(data) {
      console.log("Sending POST for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${scope.current_campaign.slug}/items`)

        this.$notify({
          title: 'Critical Success!',
          message: 'item successfully created!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

