<template>
  <div class="dashboard-view">
    <!-- Statistics Cards -->
    <div class="stats-grid">
      <DashboardCard title="Total Users" :clickable="true">
        <div class="stat-content">
          <div class="stat-number">{{ dashboardStats.totalUsers }}</div>
          <div class="stat-label">Registered Users</div>
        </div>
      </DashboardCard>

      <DashboardCard title="Active Users" :clickable="true">
        <div class="stat-content">
          <div class="stat-number">{{ dashboardStats.activeUsers }}</div>
          <div class="stat-label">Currently Active</div>
        </div>
      </DashboardCard>

      <DashboardCard title="Revenue" :clickable="true">
        <div class="stat-content">
          <div class="stat-number">${{ formatNumber(dashboardStats.totalRevenue) }}</div>
          <div class="stat-label">Total Revenue</div>
        </div>
      </DashboardCard>

      <DashboardCard title="Growth" :clickable="true">
        <div class="stat-content">
          <div class="stat-number">{{ dashboardStats.monthlyGrowth }}%</div>
          <div class="stat-label">Monthly Growth</div>
        </div>
      </DashboardCard>
    </div>

    <!-- Charts and Activities Section -->
    <div class="content-grid">
      <!-- Chart Section -->
      <DashboardCard title="Analytics Overview" class="chart-card">
        <div class="chart-placeholder">
          <div class="chart-bars">
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 45%"></div>
            <div class="bar" style="height: 90%"></div>
            <div class="bar" style="height: 70%"></div>
            <div class="bar" style="height: 55%"></div>
            <div class="bar" style="height: 85%"></div>
          </div>
          <p class="chart-label">Weekly Activity</p>
        </div>
      </DashboardCard>

      <!-- Recent Activities -->
      <DashboardCard title="Recent Activities" class="activities-card">
        <div class="activities-list">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="activity-item"
            :class="`activity-${activity.type}`"
          >
            <div class="activity-icon">
              <span v-if="activity.type === 'success'">✅</span>
              <span v-else-if="activity.type === 'warning'">⚠️</span>
              <span v-else-if="activity.type === 'error'">❌</span>
              <span v-else>ℹ️</span>
            </div>
            <div class="activity-content">
              <div class="activity-action">{{ activity.action }}</div>
              <div class="activity-details">{{ activity.user }} • {{ activity.time }}</div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>

    <!-- Quick Actions -->
    <DashboardCard title="Quick Actions">
      <div class="quick-actions">
        <button @click="$router.push('/users')" class="action-btn primary">
          👥 Manage Users
        </button>
        <button @click="$router.push('/settings')" class="action-btn secondary">
          ⚙️ Settings
        </button>
        <button @click="exportData" class="action-btn secondary">
          📊 Export Data
        </button>
        <button @click="sendNotification" class="action-btn secondary">
          🔔 Send Notification
        </button>
      </div>
    </DashboardCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import DashboardCard from '@/components/DashboardCard.vue'

const store = useDashboardStore()

const dashboardStats = computed(() => store.dashboardStats)
const recentActivities = computed(() => store.recentActivities)

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const exportData = () => {
  alert('Export functionality would be implemented here!')
}

const sendNotification = () => {
  alert('Notification sent!')
}
</script>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-content {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-card {
  min-height: 300px;
}

.chart-placeholder {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 150px;
  margin-bottom: 1rem;
}

.bar {
  width: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.chart-label {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.activities-list {
  max-height: 300px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.activity-content {
  flex: 1;
}

.activity-action {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.activity-details {
  font-size: 0.85rem;
  color: #666;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.action-btn.secondary {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
}

.action-btn.secondary:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }
}
</style>
