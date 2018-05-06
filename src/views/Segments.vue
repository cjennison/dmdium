<template lang="pug">
  #segments
    v-subheader Segments
    v-btn(:to="getCampaignBaseRoute() + '/segments/new'") + Create New
    v-layout(row wrap).pa-2
      v-flex.pa-2(xs6 v-for='segment in segments')
        v-card.segment-card.pa-1
          v-card-title.headline {{ segment.name }}
          hr
          .description.mt-3 {{ segment.description }}
          v-card-actions
            v-layout
              v-flex(xs12)
                v-spacer
                v-btn(flat, :to="getCampaignBaseRoute() + '/segments/' + segment.id + '/edit'") Edit
                v-btn(flat, :to="getCampaignBaseRoute() + '/segments/new?parent_id=' + segment.id") Create next segment
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'segments',
  created() {
    this.getSegments();
  },
  data() {
    return {
      segments: [],
      campaign: scope.current_campaign
    }
  },
  methods: {
    getSegments() {
      store.findAll('segment', {}, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', this.campaign.id),
        force: true
      }).then((segments) => {
        this.segments = segments;
      }).catch((error) => {
        console.warn(error)
      })
    },
    getCampaignBaseRoute() {
      if (!this.campaign) {
        return null;
      }
      return `/app/${this.campaign.slug}`;
    },
  }
}
</script>

<style lang="scss">
  #segments {
    .segment-card {
      min-height: 150px;
    }
  }
</style>

