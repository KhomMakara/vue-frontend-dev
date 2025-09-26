<template>
  <a-row class="b-row" v-bind="$attrs">
    <slot></slot>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BRow"
});
</script>

<style lang="scss" scoped>
.b-row {
  // Custom row styles can be added here
}
</style>
