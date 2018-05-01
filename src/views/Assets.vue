<template lang="pug">
  v-app#dashboard(toolbar, footer, dark)
    v-toolbar(app fixed clipped-left)
      v-toolbar(app fixed clipped-left)
        v-btn(flat @click="goBack()")
          v-icon arrow_left
        v-btn(to="/account") My Account
        v-btn(to="/campaigns") My Campaigns
        v-btn(to="/assets") My Assets
        v-spacer
        v-btn Logout
    v-content
      v-container
        v-layout
          v-flex(xs4)
            .search.ma-2
              v-layout
                v-flex(offset-xs2 xs8)
                  v-text-field(prepend-icon="search", name="search", label="Search Asset", id="search-input")
            v-divider
            .bank-title Monsters
            v-list
              v-list-tile(v-for='monster in monsters' @click="selectAsset(monster, 'Monster')")
                v-list-tile-title {{ monster.name }}
            v-divider
            .bank-title NPCs
            v-list
              v-list-tile(v-for='character in characters' @click="selectAsset(character, 'Character')")
                v-list-tile-title {{ character.name }}
            v-divider
            .bank-title Items
            v-list
              v-list-tile(v-for='item in items' @click="selectAsset(item, 'Item')")
                v-list-tile-title {{ item.name }}

          v-flex(xs8)
            v-layout(align-center, justify-center, fill-height)
              v-flex(xs10 offset-xs1)
                v-card.pa-2(v-if='selectedAsset')
                  v-card-title {{ selectedAsset.name }}
                  v-subheader.description {{ selectedAsset.description }}
                  v-card-actions
                    v-btn(@click="showConfirmDeleteDialog()") Delete
              v-dialog(v-model='confirmDeleteDialog', max-width='350')
                v-card
                  v-card-title.headline(v-if='selectedAsset') Are you sure you want to delete this {{ selectedAssetType }}: {{ selectedAsset.name }}?
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
  name: 'asset_bank',
  created() {
    this.getAssets();
  },
  data() {
    return {
      user: scope.current_user,
      confirmDeleteDialog: false,
      loadingStates: {
        monster: true,
        items: true,
        characters: true
      },
      monsters: [],
      items: [],
      characters: [],
      selectedAsset: null,
      selectedAssetType: null
    }
  },
  methods: {
    selectAsset(asset, type) {
      this.selectedAsset = asset;
      this.selectedAssetType = type;
    },

    showConfirmDeleteDialog() {
      this.confirmDeleteDialog = true
    },

    hideConfirmDeleteDialog() {
      this.confirmDeleteDialog = false
    },

    deleteAsset() {
      store.destroy(this.selectedAssetType.toLowerCase(), this.selectedAsset.id, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((result) => {
        this.hideConfirmDeleteDialog()
        this.selectedAsset = null;
        this.selectedAssetType = null;

        this.getAssets();
      }).catch((error) => {
        console.warn(error)
      })
    },

    getAssets() {
      store.findAll('monster', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((monsters) => {
        this.monsters = monsters;
        this.loadingStates.monsters = false;
      }).catch((error) => {
        console.warn(error)
      })

      store.findAll('item', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((items) => {
        this.items = items;
        this.loadingStates.items = false;
      }).catch((error) => {
        console.warn(error)
      })

      store.findAll('character', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((characters) => {
        this.characters = characters;
        this.loadingStates.characters = false;
      }).catch((error) => {
        console.warn(error)
      })
    }
  }
}
</script>
