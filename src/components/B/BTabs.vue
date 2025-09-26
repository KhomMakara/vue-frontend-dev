<template>
  <a-tabs class="b-tabs" v-bind="$attrs">
    <slot></slot>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BTabs"
});
</script>

<style lang="scss" scoped>
.b-tabs {
  :deep(.ant-tabs-tab) {
    font-weight: 500;
  }

  :deep(.ant-tabs-tab-active) {
    font-weight: 600;
  }

  :deep(.ant-tabs-content-holder) {
    padding-top: 16px;
  }
}
</style>
