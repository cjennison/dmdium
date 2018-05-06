<template lang="pug">
  .segment-form 
    form
      .subheading Enter information for your segment
      v-text-field(v-model="segmentForm.name"
        label="Segment Name"
        :counter="64"
        required)
      v-text-field(v-model="segmentForm.description"
        label="Description"
        required)
      vue-editor.html-editor(v-model="segmentForm.plot")
      v-btn(@click="submit", :disabled="!fieldsFilled()") Submit
      v-btn(@click="reset" flat) Reset
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'segment_form',
  props: {
    segmentForm: {
      type: Object
    },
    formType: {
      type: String
    }
  },
  components: { VueEditor },
  created() {
    if (this.formType == 'edit') {
      this.segment = _.cloneDeep(this.segmentForm)
    }
  },
  data() {
    return {
      valid: false,
      segment: null
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
      if (this.formType === 'edit') {
         _.forEach(this.segmentForm, (value, key) => {
          this.segmentForm[key] = this.segment[key];
        })
      } else {
        _.forEach(this.segmentForm, (value, key) => {
          this.segmentForm[key] = null;
        })
      }
    }
  }
}
</script>

<style lang='scss'>
  .segment-form {
    .html-editor {
      background: white;
      color: black;
    }
  }
</style>
