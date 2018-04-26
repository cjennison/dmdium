<template lang="pug">
  #campaign_summary
    v-subheader Summary
    h1.display-2 {{ campaign.name }}
</template>

<script>

import scope from '@/services/scope';

export default {
  name: 'campaign_summary',
  props: {
    campaign: { type: Object }
  },
  watch: {
    campaign (newCampaign) {
      console.log("Campaign Changed")
    }
  }
}
</script>
