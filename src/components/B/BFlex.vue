<template>
  <a-flex class="b-flex" v-bind="$attrs">
    <slot></slot>
  </a-flex>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BFlex"
});
</script>

<style lang="scss" scoped>
.b-flex {
  // Custom flex styles can be added here
}
</style>
