<template>
  <a-select-option class="b-select-option" v-bind="$attrs" :value="value">
    <slot></slot>
  </a-select-option>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BSelectOption",
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.b-select-option {
  // Custom select option styles can be added here
}
</style>
