<template lang="pug">
  #asset-view
    v-layout(align-center='align-center', justify-center='justify-center', fill-height='fill-height')
      v-flex(xs10='xs10', offset-xs1='offset-xs1')
        v-card.pa-2(v-if='asset')
          v-card-title {{ asset.name }}
          v-subheader.description {{ asset.description }}
          v-card-actions
            v-btn(@click='showConfirmDeleteDialog()') Delete
      v-dialog(v-model='confirmDeleteDialog', max-width='350')
        v-card
          v-card-title.headline(v-if='asset')
            | Are you sure you want to delete this {{ type }}: {{ asset.name }}?
          v-card-text
            | This is permamenent. But your current campaigns using this asset will be unaffected.
          v-card-actions
            v-spacer
            v-btn(color='orange darken-1', flat='flat', @click.native='hideConfirmDeleteDialog()') Cancel
            v-btn(color='green darken-1', flat='flat', @click.native='deleteAsset()') Yes
</template>

<script>
import { store, getHttpAdapter } from '@/services/HttpService';
import scope from '@/services/scope';

export default {
  name: 'asset_view',
  props: {
    asset: { type: Object },
    type: { type: String }
  },
  data() {
    return {
      confirmDeleteDialog: false
    }
  },
  methods: {
    showConfirmDeleteDialog() {
      this.confirmDeleteDialog = true
    },

    hideConfirmDeleteDialog() {
      this.confirmDeleteDialog = false
    },

    deleteAsset() {
      store.destroy(this.type.toLowerCase(), this.asset.id, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((result) => {
        this.hideConfirmDeleteDialog()
        this.$emit('delete-asset', this.type)
      }).catch((error) => {
        console.warn(error)
      })
    },
  }
}
</script>
