<template lang="pug">
  .new-segment-form 
    form
      .display-1 New Monster
      .subheading Enter information for your monster
      v-text-field(v-model="monsterForm.name"
        label="Monster Name"
        :counter="64"
        required)
      v-text-field(v-model="monsterForm.description"
        label="Description"
        required)
      v-text-field(v-model="monsterForm.hitpoints"
        label="Hitpoints"
        suffix="HP"
        type="number"
        required)
      v-text-field(v-model="monsterForm.hit"
        label="Hit Dice"
        :counter="10")
      v-text-field(v-model="monsterForm.damage"
        label="Damage Dice"
        :counter="10")
      v-text-field(v-model="monsterForm.armor_class"
        label="Armor Class"
        :counter="3")
      v-text-field(
        label="Avatar"
        type="file")
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>

import _ from 'lodash';

export default {
  name: 'new_monster_form',
  props: {
    monsterForm: {
      type: Object
    },
    formType: {
      type: String
    }
  },
  created() {
    if (this.formType == 'edit') {
      this.monster = _.cloneDeep(this.monsterForm)
    }
  },
  data() {
    return {
      valid: false,
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.monsterForm)
      this.$emit('submit-form', this.monsterForm)
    },

    fieldsFilled() {
      return this.monsterForm.name &&
             this.monsterForm.description &&
             this.monsterForm.hitpoints
    },

    reset() {
      if (this.formType === 'edit') {
         _.forEach(this.monsterForm, (value, key) => {
          this.monsterForm[key] = this.monster[key];
        })
      } else {
        _.forEach(this.monsterForm, (value, key) => {
          this.monsterForm[key] = null;
        })
      }
    }
  }
}
</script>

