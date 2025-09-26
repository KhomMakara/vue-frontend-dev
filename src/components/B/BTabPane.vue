<template>
  <a-tab-pane class="b-tab-pane" v-bind="$attrs">
    <slot></slot>
  </a-tab-pane>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BTabPane"
});
</script>

<style lang="scss" scoped>
.b-tab-pane {
  // Custom tab pane styles can be added here
}
</style>
