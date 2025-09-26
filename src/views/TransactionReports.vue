<template>
  <div class="transaction-reports">
    <a-card title="Transaction Reports">
      <a-result
        status="info"
        title="Transaction Reports"
        sub-title="This page is under development. Generate and view transaction reports here."
      >
        <template #extra>
          <a-button type="primary" @click="$router.push('/')">
            Back to Dashboard
          </a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransactionReports"
});
</script>

<style lang="scss" scoped>
</style>
