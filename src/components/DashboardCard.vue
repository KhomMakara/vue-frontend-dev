<template>
  <div class="dashboard-card" :class="{ 'card-clickable': clickable }">
    <div v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>

    <div class="card-content">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  clickable?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.dashboard-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.card-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.card-content {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  background-color: #f8f9fa;
}
</style>
