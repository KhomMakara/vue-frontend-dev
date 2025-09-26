<template>
  <div class="user-activity">
    <a-card title="User Activity">
      <a-result
        status="info"
        title="User Activity"
        sub-title="This page is under development. Monitor user activities and audit logs here."
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
  name: "UserActivity"
});
</script>

<style lang="scss" scoped>
</style>
