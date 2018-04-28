<template lang="pug">
  .new-segment-form 
    form
      .display-1 New Item
      .subheading Enter information for your Item
      v-text-field(v-model="itemForm.name"
        label="item Name"
        :counter="64"
        required)
      v-text-field(v-model="itemForm.description"
        label="Description"
        required)
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>

import _ from 'lodash';

export default {
  name: 'item_form',
  props: {
    itemForm: {
      type: Object,
      required: true
    },
    formType: {
      type: String
    }
  },
  created() {
    if (this.formType == 'edit') {
      this.item = _.cloneDeep(this.itemForm)
    }
  },
  data() {
    return {
      valid: false,
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.itemForm)
      this.$emit('submit-form', this.itemForm)
    },

    fieldsFilled() {
      return this.itemForm.name &&
             this.itemForm.description
    },

    reset() {
      if (this.formType === 'edit') {
         _.forEach(this.itemForm, (value, key) => {
          this.itemForm[key] = this.item[key];
        })
      } else {
        _.forEach(this.itemForm, (value, key) => {
          this.itemForm[key] = null;
        })
      }
    }
  }
}
</script>

