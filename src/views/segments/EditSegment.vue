<template lang="pug">
  #new-segment
    v-layout
      v-flex(sm8 offset-sm2 xs12)
        v-card.pa-3
          h2 Edit Segment
          v-progress-circular(v-if="loading", indeterminate, :size="200") Loading Segment . . .
          segment-form(v-else, :segmentForm="segmentForm", formType="edit", @submit-form="editSegment")
</template>

<script>

import { store, getHttpAdapter } from '@/services/HttpService';
import _ from 'lodash';

import SegmentForm from '@/components/segments/SegmentForm'
import scope from '@/services/scope';

export default {
  name: 'new_segment',
  components: { SegmentForm },
  created() {
    this.getSegment(this.$route.params.segment_id);
  },
  data() {
    return {
      loading: true,
      segmentForm: {}
    }
  },
  methods: {
    getSegment(id) {
      store.find('segment', id).then((segment) => {
        this.loading = false;
        this.segmentForm = _.cloneDeep(segment);
      })
    },

    editSegment(data) {
      console.log("Sending POST for", data)
      store.update('segment', this.$route.params.segment_id, {
        segment: data
      }, {
        basePath: getHttpAdapter().resourceBasePath('campaigns', scope.current_campaign.id),
        force: true
      }).then((campaign) => {
        this.$router.push(`/app/${scope.current_campaign.slug}/segments`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Segment successfully edited!',
          type: 'success'
        });
      }).catch((error) => {
        console.warn(err)
      })
    }
  }
}
</script>

