<template lang="pug">
  .new-segment-form 
    form
      .display-1 New NPC
      .subheading Enter information for your NPC
      v-text-field(v-model="characterForm.name"
        label="NPC Name"
        :counter="64"
        required)
      v-text-field(v-model="characterForm.description"
        label="Description"
        required)
      v-text-field(v-model="characterForm.hitpoints"
        label="Hitpoints"
        suffix="HP"
        type="number")
      v-text-field(
        label="Avatar"
        type="file")
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>

import _ from 'lodash';

export default {
  name: 'character_form',
  props: {
    characterForm: {
      type: Object
    },
    formType: {
      type: String
    }
  },
  created() {
    if (this.formType == 'edit') {
      this.character = _.cloneDeep(this.characterForm)
    }
  },
  data() {
    return {
      valid: false,
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.characterForm)
      this.$emit('submit-form', this.characterForm)
    },

    fieldsFilled() {
      return this.characterForm.name &&
             this.characterForm.description
    },

    reset() {
      if (this.formType === 'edit') {
         _.forEach(this.characterForm, (value, key) => {
          this.characterForm[key] = this.character[key];
        })
      } else {
        _.forEach(this.characterForm, (value, key) => {
          this.characterForm[key] = null;
        })
      }
    }
  }
}
</script>

