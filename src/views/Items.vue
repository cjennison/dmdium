<template lang="pug">
  #segments
    v-subheader Items for #[b &nbsp{{ campaign.name }}]
    v-layout
      v-flex(xs2 offset-xs10)
        v-spacer
        v-btn(:to="getCampaignBaseRoute() + '/items/new'") + Create New
    v-layout(row wrap).pa-2()
      v-flex.pa-2(xs3 v-for='item in items')
        v-card.item-card.pa-1
          v-card-media(v-if='item.image_url', :src="item.image_url" height="200px")
          v-card-title.headline {{ item.name }}
          hr
          .description.mt-3 {{ item.description }}
          v-card-actions
            v-btn(flat, :to="getCampaignBaseRoute() + '/items/' + item.id + '/edit'") Edit
            v-btn(flat, class="danger") Delete
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'items',
  created() {
    this.getItems();
  },
  data() {
    return {
      items: [],
      campaign: scope.current_campaign
    }
  },
  methods: {
    getItems() {
      store.findAll('item', {}, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((items) => {
        this.items = items;
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
  #items {
    .item-card {
      min-height: 150px;
    }
  }
</style>

