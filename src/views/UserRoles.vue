<template>
  <div class="user-roles">
    <a-card title="User Roles Management">
      <a-result
        status="info"
        title="User Roles Management"
        sub-title="This page is under development. Manage user roles and permissions here."
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
  name: "UserRoles"
});
</script>

<style lang="scss" scoped>
</style>
