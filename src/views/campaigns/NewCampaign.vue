<template lang="pug">
  v-layout(align-center, justify-center)#new-campaign
    v-flex(xs12, sm8, md4)
        v-card.pa-3
          campaign-form(:campaignForm="campaignForm", @submit-form="createNewCampaign")
</template>

<script>

import CampaignForm from '@/components/campaigns/CampaignForm'
import scope from '@/services/scope';

export default {
  name: 'new_campaign',
  components: { CampaignForm },
  data() {
    return {
      campaignForm: {
        name: null,
        description: null
      }
    }
  },
  methods: {
    createNewCampaign(data) {
      console.log("Sending POST for", data)
      //  TODO Implement actual response
      setTimeout(() => {
        this.$router.push(`/app/${data.slug}`)

        this.$notify({
          title: 'Critical Success!',
          message: 'Campaigns successfully created!',
          type: 'success'
        });
      }, 1000)
    }
  }
}
</script>

