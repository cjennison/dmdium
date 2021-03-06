<template lang='pug'>
  v-app#dashboard(toolbar, footer, dark)
    v-navigation-drawer(
        clipped, 
        v-model='drawer', 
        fixed, 
        app)
      v-list(dense)
        v-list-tile(@click, :to="getCampaignBaseRoute()")
          v-list-tile-action
            v-icon home
          v-list-tile-content
            v-list-tile-title Home
        v-list-tile(@click :to="getCampaignBaseRoute() + '/segments'")
          v-list-tile-action
            v-icon tab
          v-list-tile-content
            v-list-tile-title Segments
        v-list-tile(@click :to="getCampaignBaseRoute() + '/monsters'")
          v-list-tile-action
            v-icon surround_sound
          v-list-tile-content
            v-list-tile-title Monsters
        v-list-tile(@click :to="getCampaignBaseRoute() + '/npcs'")
          v-list-tile-action
            v-icon account_box
          v-list-tile-content
            v-list-tile-title NPCs
        v-list-tile(@click :to="getCampaignBaseRoute() + '/items'")
          v-list-tile-action
            v-icon playlist_play
          v-list-tile-content
            v-list-tile-title Items
    v-toolbar(app fixed clipped-left)
      v-toolbar-side-icon.hidden-lg-and-up(@click.stop='drawer = !drawer')
      v-toolbar-title(v-if='currentCampaign') {{ currentCampaign.name }}
      v-menu(offset-y, v-if='campaigns && campaigns.length > 1')
        v-icon(dark slot="activator") keyboard_arrow_down
        v-list
          v-list-tile(v-for="campaign in campaigns" @click='selectCampaign(campaign)')
            v-list-tile-title {{ campaign.name }}
          v-list-tile(to="/campaigns")
            v-list-tile-title.subheader View All #[v-icon arrow_right]
      v-spacer
      v-menu(offset-y)
        v-toolbar-title(dark slot="activator") 
          .firstlast(v-if='user.first_name || user.last_name') {{ user.first_name }} {{ user.last_name }}
          .email(v-else) {{ user.email }}
           v-icon(dark slot="activator") keyboard_arrow_down
        v-list
          v-list-tile(@click to="/account")
            v-list-tile-title My Account
    v-content
      v-container(fluid fill-height)
        v-layout
          v-flex
            router-view(v-if='currentCampaign', :campaign="currentCampaign") Campaign Stuff
            v-progress-circular(v-else, indeterminate, :size="200") Loading . . .
    v-footer(app fixed)
      span.white--text © 2018
</template>

<script>

import _ from 'lodash';
import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'dashboard',
  created() {
    this.getCampaigns();
  },
  data () {
    return {
      drawer: true,
      campaigns: null,
      currentCampaign: null
    }
  },
  computed: {
    user() {
      return scope.current_user
    }
  },
  methods: {
    getCampaignBaseRoute() {
      if (!this.currentCampaign) {
        return null;
      }
      return `/app/${this.currentCampaign.slug}`;
    },
    getCampaigns() {
      store.findAll('campaign', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((campaigns) => {
        this.campaigns = campaigns;

        //  Find and set the slug campaign
        const paramCampaign = _.find(campaigns, campaign => campaign.slug == this.$route.params.campaign_slug)
        this.currentCampaign = paramCampaign;
        scope.current_campaign = paramCampaign;
      }).catch((error) => {
        console.warn(error)
      })
    },

    selectCampaign(campaign) {
      this.currentCampaign = campaign;
      scope.current_campaign = campaign;
      this.$router.push(this.getCampaignBaseRoute())
    }
  }
}
</script>

<style lang="scss">
  #dashboard {
    .list__tile__action, .list__tile__content {
      color:white !important;
    }
  }
</style>
