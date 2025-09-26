<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <h2 v-if="!sidebarCollapsed">Dashboard</h2>
          <h2 v-else>D</h2>
        </div>
        <button @click="toggleSidebar" class="toggle-btn">
          <span class="hamburger"></span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li>
            <RouterLink to="/" class="nav-item">
              <span class="icon">📊</span>
              <span v-if="!sidebarCollapsed" class="text">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/users" class="nav-item">
              <span class="icon">👥</span>
              <span v-if="!sidebarCollapsed" class="text">Users</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/settings" class="nav-item">
              <span class="icon">⚙️</span>
              <span v-if="!sidebarCollapsed" class="text">Settings</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="user-profile">
            <span class="user-avatar">👤</span>
            <span class="user-name">John Doe</span>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'home': 'Dashboard',
    'users': 'User Management',
    'settings': 'Settings'
  }
  return titles[route.name as string] || 'Dashboard'
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hamburger {
  display: block;
  width: 18px;
  height: 2px;
  background-color: white;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 2px;
  background-color: white;
  transition: 0.3s;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  bottom: -6px;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  border-radius: 0 25px 25px 0;
  margin-right: 1rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.router-link-active {
  background-color: white;
  color: #667eea;
  font-weight: 600;
}

.nav-item .icon {
  font-size: 1.2rem;
  margin-right: 0.75rem;
  width: 24px;
  text-align: center;
}

.nav-item .text {
  white-space: nowrap;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-radius: 25px;
}

.user-avatar {
  font-size: 1.2rem;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    z-index: 1000;
    height: 100%;
  }

  .sidebar-collapsed {
    width: 0;
    overflow: hidden;
  }

  .main-content {
    width: 100%;
  }

  .header {
    padding: 1rem;
  }

  .content {
    padding: 1rem;
  }
}
</style>
