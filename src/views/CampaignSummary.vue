<template lang="pug">
  #campaign_summary
    v-subheader Summary
    h1.display-2 {{ campaign.name }}
    .story.pa-3(style='text-align:left')
      v-card.pa-3
        v-layout
          v-flex(xs12)
            v-card-title The Story So Far
        v-layout  
          v-flex(xs12)
            .story
              v-alert(type="warning" :value="true") You haven't completed a segment yet! Complete a segment to write your story.
    v-layout

      v-flex.pa-3(xs12 sm4)
        v-card
          v-card-title 
            span.headline Segments
          hr
          v-card-title You don't have any segments yet!
          v-card-actions 
            v-btn View
            v-btn(@click :to="getCampaignBaseRoute() + '/segments/new'") Create New
      v-flex.pa-3(xs12 sm4)
        v-card
          v-card-title 
            span.headline Monsters
          hr
          v-card-title You don't have any monsters yet!
          v-card-actions 
            v-btn View
            v-btn Create New
      v-flex.pa-3(xs12 sm4)
        v-card
          v-card-title 
            span.headline Items
          hr
          v-card-title You don't have any monsters yet!
          v-card-actions
            v-btn View
            v-btn Create New
</template>

<script>

export default {
  name: 'campaign_summary',
  props: {
    campaign: { type: Object }
  },
  watch: {
    campaign (newCampaign) {
      console.log("Campaign Changed", newCampaign)
    }
  },
  methods: {
    getCampaignBaseRoute() {
      return `/app/${this.campaign.slug}`;
    },
  }
}
</script>
