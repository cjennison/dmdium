<template lang="pug">
  .new-segment-form 
    form
      .display-1 New Segment
      .subheading Enter information for your segment
      v-text-field(v-model="segmentForm.name"
        label="Segment Name"
        :counter="64"
        required)
      v-text-field(v-model="segmentForm.synopsis"
        label="Synopsis"
        required)
      v-select(v-model="segmentForm.type"
          :items="type_options"
          label="Select"
          item-value="key"
          item-text="name"
          single-line
          bottom)
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
      valid: false,
      type_options: [
        {
          name: 'Exploration',
          key: 'exploration'
        },
        {
          name: 'Combat',
          key: 'combat'
        },
        {
          name: 'Dialogue',
          key: 'dialogue'
        },
        {
          name: 'Travel',
          key: 'travel'
        }
      ]
    }
  },
  methods: {
    submit() {
      console.log("Submitted", this.segmentForm)
      this.$emit('submit-form', this.segmentForm)
    },

    fieldsFilled() {
      return this.segmentForm.name &&
        this.segmentForm.synopsis &&
        this.segmentForm.type
    },

    reset() {
      this.segmentForm.name = null;
      this.segmentForm.synopsis = null;
      this.segmentForm.type = null;
    }
  }
}
</script>

