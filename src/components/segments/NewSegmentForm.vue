<template lang="pug">
  .new-segment-form 
    form
      .display-1 New Segment
      .subheading Enter information for your segment
      v-text-field(v-model="segmentForm.name"
        label="Segment Name"
        :counter="64"
        required)
      v-text-field(v-model="segmentForm.description"
        label="Description"
        required)
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>
export default {
  name: 'new_segment_form',
  props: {
    segmentForm: {
      type: Object
    }
  },
  data() {
    return {
      valid: false
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.segmentForm)
      this.$emit('submit-form', this.segmentForm)
    },

    fieldsFilled() {
      return this.segmentForm.name &&
        this.segmentForm.description;
    },

    reset() {
      this.segmentForm.name = null;
      this.segmentForm.description = null;
    }
  }
}
</script>

