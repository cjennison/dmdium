<template lang="pug">
  .new-campaign-form 
    form
      .display-1 New campaign
      .subheading Enter information for your Campaign
      v-text-field(v-model="campaignForm.name"
        label="Campaign Name"
        :counter="128"
        required)
      v-text-field(v-model="campaignForm.description"
        label="Description"
        required)
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>

import _ from 'lodash';

export default {
  name: 'campaign_form',
  props: {
    campaignForm: {
      type: Object,
      required: true
    },
    formType: {
      type: String
    }
  },
  created() {
    if (this.formType == 'edit') {
      this.campaign = _.cloneDeep(this.campaignForm)
    }
  },
  data() {
    return {
      valid: false,
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.campaignForm)
      this.$emit('submit-form', this.campaignForm)
    },

    fieldsFilled() {
      return this.campaignForm.name &&
             this.campaignForm.description
    },

    reset() {
      if (this.formType === 'edit') {
         _.forEach(this.campaignForm, (value, key) => {
          this.campaignForm[key] = this.campaign[key];
        })
      } else {
        _.forEach(this.campaignForm, (value, key) => {
          this.campaignForm[key] = null;
        })
      }
    }
  }
}
</script>

