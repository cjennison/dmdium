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
              v-layout(fill-height)
                v-flex(offset-xs2 xs8)
                  v-text-field(prepend-icon="search", name="search", label="Search Asset", id="search-input")
            v-divider
            v-layout
              v-flex(xs8)
                .subheading(style="line-height: 3;") Monsters
              v-flex(xs4)
                v-btn(flat, @click="toggleCreateModal('Monster')") + Add
            v-list
              v-list-tile(v-for='monster in monsters' @click="selectAsset(monster, 'Monster')")
                v-list-tile-title {{ monster.name }}
            v-divider
            v-layout
              v-flex(xs8)
                .subheading(style="line-height: 3;") NPCs
              v-flex(xs4)
                v-btn(flat, @click="toggleCreateModal('Character')") + Add
            v-list
              v-list-tile(v-for='character in characters' @click="selectAsset(character, 'Character')")
                v-list-tile-title {{ character.name }}
            v-divider
            v-layout
              v-flex(xs8)
                .subheading(style="line-height: 3;") Items
              v-flex(xs4)
                v-btn(flat, @click="toggleCreateModal('Item')") + Add
            v-list
              v-list-tile(v-for='item in items' @click="selectAsset(item, 'Item')")
                v-list-tile-title {{ item.name }}
          v-flex(xs8)
            asset-view(v-if='selectedAsset', :asset="selectedAsset", :type="selectedAssetType", @delete-asset="updateAssetList")
      v-dialog(v-model='createModal', max-width='500')
        v-card
          v-card-title.headline
            | Create a new {{ createModalType }}
          v-card-text
            | This {{ createModalType }} will be stored in your asset bank to add to campaigns later!
            character-form(v-if='createModalType == "Character"', :characterForm="assetForm", @submit-form="createAsset")
            item-form(v-if='createModalType == "Item"', :itemForm="assetForm", @submit-form="createAsset")
            monster-form(v-if='createModalType == "Monster"', :monsterForm="assetForm", @submit-form="createAsset")
</template>

<script>
import { store, getHttpAdapter } from '@/services/HttpService';
import AssetView from '@/views/assets/AssetView.vue';
import CharacterForm from '@/components/characters/CharacterForm';
import MonsterForm from '@/components/monsters/MonsterForm';
import ItemForm from '@/components/items/ItemForm';

import scope from '@/services/scope';

export default {
  name: 'asset_bank',
  components: { 
    AssetView ,
    CharacterForm,
    ItemForm,
    MonsterForm
  },
  created() {
    this.getMonsters();
    this.getItems();
    this.getCharacters();
  },
  data() {
    return {
      user: scope.current_user,
      createModal: false,
      createModalType: null,
      assetForm: {},
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
    toggleCreateModal(type) {
      this.createModal = !this.createModal;
      this.createModalType = type;
      this.assetForm = {};
    },

    selectAsset(asset, type) {
      this.selectedAsset = asset;
      this.selectedAssetType = type;
    },

    updateAssetList(type) {
      this.selectedAsset = null;
      this.selectedAssetType = null;
      this[`get${type}s`]();
    },

    createAsset(form) {
      const params = {}
      params[this.createModalType.toLowerCase()] = form
      store.create(this.createModalType.toLowerCase(), params, {
        force: true,
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id)
      }).then((asset) => {
        this.$notify({
          title: 'Critical Success!',
          message: this.createModalType + ' successfully created!',
          type: 'success'
        });

        this.updateAssetList(this.createModalType)
        this.toggleCreateModal()
      }).catch((error) => {
        console.warn(err)
      })
    },

    getMonsters() {
      store.findAll('monster', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((monsters) => {
        this.monsters = monsters;
        this.loadingStates.monsters = false;
      }).catch((error) => {
        console.warn(error)
      })
    },

    getItems() {
      store.findAll('item', {}, {
        basePath: getHttpAdapter().resourceBasePath('users', scope.current_user.id),
        force: true
      }).then((items) => {
        this.items = items;
        this.loadingStates.items = false;
      }).catch((error) => {
        console.warn(error)
      })
    },

    getCharacters() {
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
