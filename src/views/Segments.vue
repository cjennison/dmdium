<template lang="pug">
  #segments
    v-subheader Segments
    v-layout(row wrap).pa-2()
      v-flex.pa-2(xs6 v-for='segment in segments')
        v-card.segment-card.pa-1
          v-card-title.headline {{ segment.name }}
          hr
          .description.mt-3 {{ segment.synopsis }}
</template>

<script>

import APIService from '@/services/fake-api-service';
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
      APIService.getSegmentsForCampaign(this.campaign.id).then((segments) => {
        this.segments = segments;
      })
    }
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

