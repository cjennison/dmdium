<template lang="pug">
  #new-segment
    v-layout
      v-flex(sm6 offset-sm3 xs12)
        v-card.pa-3
          new-segment-form(:segmentForm="segmentForm", @submit-form="createNewSegment")
</template>

<script>

import NewSegmentForm from '@/components/segments/NewSegmentForm'
import scope from '@/services/scope';

export default {
  name: 'new_segment',
  components: { NewSegmentForm },
  data() {
    return {
      segmentForm: {
        name: null,
        parent_id: null,
        synopsis: null,
        type: null,
        outcome: null
      }
    }
  },
  methods: {
    createNewSegment(data) {
      console.log("Sending POST for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${scope.current_campaign.slug}/segments`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Segment successfully created!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

