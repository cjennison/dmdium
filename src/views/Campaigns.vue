<template lang="pug">
  v-layout(align-center, justify-center)#campaigns
    v-flex(xs12, sm8, md4)
      v-card.elevation-12
        v-toolbar(dark)
          v-toolbar-title Campaigns
        v-card-text
          v-progress-circular(v-if="loading", indeterminate, :size="150") Loading . . .
          v-list
            v-list-tile(v-for='campaign in campaigns', @click, :to="'app/' + campaign.slug ")
              v-list-tile-content
                v-list-tile-title {{ campaign.name }}
                v-list-tile-sub-title {{ campaign.description }}
        v-card-actions
          v-spacer
          v-btn(to="/campaigns/new") + Create New

</template>

<script>
import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'user_account',
  created() {
    this.getCampaigns();
  },
  data() {
    return {
      campaigns: [],
      loading: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getCampaigns() {
      store.findAll('campaign', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((campaigns) => {
        this.campaigns = campaigns;
        this.loading = false
      }).catch((error) => {
        console.warn(error)
      })
    }
  }
}
</script>
