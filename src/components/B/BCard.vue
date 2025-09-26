<template>
  <a-card class="b-card" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BCard"
});
</script>

<style lang="scss" scoped>
.b-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  :deep(.ant-card-head) {
    border-bottom: 1px solid #f0f0f0;

    .ant-card-head-title {
      font-weight: 600;
      font-size: 16px;
    }
  }

  :deep(.ant-card-body) {
    padding: 24px;
  }

  :deep(.ant-card-extra) {
    font-weight: normal;
  }
}
</style>
