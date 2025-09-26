<template>
  <a-space class="b-space" v-bind="$attrs">
    <slot></slot>
  </a-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BSpace"
});
</script>

<style lang="scss" scoped>
.b-space {
  // Custom space styles can be added here
}
</style>
