<template>
  <!-- NAME: BForm.vue, LAST_CHNG: moeunchhorvorn -->
  <a-form v-bind="$attrs" @keyup="onKeyupCustom">
      <slot></slot>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BForm",
  provide() {
      return {
          form: this,
          formItems: this.formItems, // Provide formItems to child components
          formItemFields: this.formItemFields
      };
  },
emits: ["submit"],
  data() {
      return {
          formModel: {}, // Your form model data
          formItems: [], // Array to store references to form items
          formItemFields: [] // Array to store references to form item inputs
      };
  },
  mounted() {
      // # Provide & Inject
  },
  methods: {
      getFormItems() {
          return this.formItems;
      },
      onKeyupCustom(event: any) {
          // ctrl + enter
          if (event.ctrlKey && event.key === "Enter") {
              this.$emit("submit", event);
              event.stopPropagation();
          }
      }
  }
});
</script>

<style scoped>
/* prettier-ignore-start */
/* prettier-ignore-end */
</style>
