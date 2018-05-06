<template lang="pug">
  .quick-add-form
    v-card
      v-card-text
        | Add a {{ assetType }} from your saved assets.
        .search-bar
          el-select(
            v-model="selectedAsset"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a search term"
            :remote-method="fetchAssets"
            :loading="loading"
            @change="selectAsset")
            el-option(
              v-for="asset in matchedList"
              :key="asset.id"
              :label="asset.name"
              :value="asset.id")
      v-card-actions
        v-btn(color='orange darken-1', flat='flat', @click.native='cancel()') Cancel
</template>

<script>
import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'quick_add_form',
  props: { assetType: { type: String }},
  data() {
    return {
      loading: false,
      matchedList: [],
      selectedAsset: null
    }
  },
  computed: {
    campaign() {
      return scope.current_campaign;
    },
    user() {
      return scope.current_user;
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },

    selectAsset(asset) {
      if (asset) {
        this.$emit('select', asset)
      }
      this.selectedAsset = null
    },

    fetchAssets(queryString) {
      if (queryString.length > 3 && !this.loading) {
        this.loading = true
        store.findAll('asset', {
          name: queryString,
          type: this.assetType
        }, {
          basePath: getHttpAdapter().resourceBasePath('users', this.user.id),
          endpoint: 'assets/search',
          force: true
        }).then((result) => {
          this.matchedList = result;
        }).catch((err) => {
          console.warn(err)
        }).then(() => {
          this.loading = false;
        })
      } 
    }
  }
}
</script>

