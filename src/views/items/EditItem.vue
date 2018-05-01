<template lang="pug">
  #new-item
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading Item . . .
          item-form(v-else, :itemForm="itemForm", formType="edit" @submit-form="editItem")
</template>

<script>

import _ from 'lodash';
import { store } from '@/services/HttpService';
import ItemForm from '@/components/items/ItemForm'
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
      store.find('item', id).then((item) => {
        this.loading = false;
        this.itemForm = _.cloneDeep(item);
      })
    },

    editItem(data) {
      console.log("Sending PUT for", data)
      store.update('item', this.$route.params.item_id, {
        item: data
      }, {
        force: true
      }).then((item) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/items`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Item successfully updated!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

