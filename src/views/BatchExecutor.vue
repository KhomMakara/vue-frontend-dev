<template>
  <div class="batch-executor">
    <a-card title="Batch Executor">
      <a-result
        status="info"
        title="Batch Executor"
        sub-title="This page is under development. Execute batch jobs and monitor their progress here."
      >
        <template #extra>
          <a-button type="primary" @click="$router.push('/batch-list')">
            Back to Batch List
          </a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BatchExecutor"
});
</script>

<style lang="scss" scoped>
</style>
