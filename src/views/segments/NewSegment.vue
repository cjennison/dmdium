<template lang="pug">
  #new-segment
    v-layout
      v-flex(sm8 offset-sm2 xs12)
        v-card.pa-3
          h2 New Segment
          segment-form(:segmentForm="segmentForm", @submit-form="createNewSegment")
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import SegmentForm from '@/components/segments/SegmentForm'
import scope from '@/services/scope';

export default {
  name: 'new_segment',
  components: { SegmentForm },
  data() {
    return {
      segmentForm: {
        name: null,
        description: null,
        plot: null
      }
    }
  },
  methods: {
    createNewSegment(data) {
      console.log("Sending POST for", data)
      store.create('segment', {
        segment: data
      }, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((campaign) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/segments`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Segment successfully created!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

