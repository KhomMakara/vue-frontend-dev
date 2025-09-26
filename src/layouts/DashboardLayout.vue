<template>
  <a-config-provider :theme="theme">
    <a-layout style="min-height: 100vh">
      <Sidebar />
      <Wrapper>
        <RouterView />
      </Wrapper>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Wrapper from "./Wrapper.vue";
import Sidebar from "./Sidebar.vue";

export default defineComponent({
  name: "DashboardLayout",
  components: {
    Wrapper,
    Sidebar,
    RouterView
  },
  data() {
    return {
      theme: {
        token: {
          colorPrimary: "#4e2a81"
        }
      }
    };
  },
  inheritAttrs: false
});
</script>

<style lang="scss" scoped>
</style>
