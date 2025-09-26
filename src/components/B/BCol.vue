<template>
  <a-col class="b-col" v-bind="$attrs">
    <slot></slot>
  </a-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BCol"
});
</script>

<style lang="scss" scoped>
.b-col {
  // Custom column styles can be added here
}
</style>
