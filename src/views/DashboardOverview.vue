<template>
  <div class="dashboard-overview">
    <!-- Statistics Cards -->
    <b-row :gutter="16" class="stats-row">
      <b-col :span="6">
        <b-card>
          <a-statistic
            title="Total Users"
            :value="stats.totalUsers"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-statistic>
        </b-card>
      </b-col>
      <b-col :span="6">
        <b-card>
          <a-statistic
            title="Active Sessions"
            :value="stats.activeSessions"
            :value-style="{ color: '#1890ff' }"
          >
            <template #prefix>
              <GlobalOutlined />
            </template>
          </a-statistic>
        </b-card>
      </b-col>
      <b-col :span="6">
        <b-card>
          <a-statistic
            title="Daily Transactions"
            :value="stats.dailyTransactions"
            :value-style="{ color: '#722ed1' }"
          >
            <template #prefix>
              <CreditCardOutlined />
            </template>
          </a-statistic>
        </b-card>
      </b-col>
      <b-col :span="6">
        <b-card>
          <a-statistic
            title="System Health"
            value="99.8%"
            :value-style="{ color: '#52c41a' }"
          >
            <template #prefix>
              <CheckCircleOutlined />
            </template>
          </a-statistic>
        </b-card>
      </b-col>
    </b-row>

    <!-- Charts and Activities -->
    <b-row :gutter="16" style="margin-top: 16px">
      <b-col :span="16">
        <b-card title="Transaction Overview" :bordered="false">
          <div class="chart-container">
            <div class="mock-chart">
              <div class="chart-bars">
                <div class="bar" style="height: 60%"></div>
                <div class="bar" style="height: 80%"></div>
                <div class="bar" style="height: 45%"></div>
                <div class="bar" style="height: 90%"></div>
                <div class="bar" style="height: 70%"></div>
                <div class="bar" style="height: 55%"></div>
                <div class="bar" style="height: 85%"></div>
              </div>
              <div class="chart-labels">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col :span="8">
        <b-card title="Recent Activities" :bordered="false">
          <div class="activity-list">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-icon">
                <CheckCircleOutlined v-if="activity.type === 'success'" style="color: #52c41a" />
                <ExclamationCircleOutlined v-else-if="activity.type === 'warning'" style="color: #faad14" />
                <InfoCircleOutlined v-else style="color: #1890ff" />
              </div>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-time">{{ formatTime(activity.time) }}</div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Quick Actions -->
    <b-row :gutter="16" style="margin-top: 16px">
      <b-col :span="24">
        <b-card title="Quick Actions" :bordered="false">
          <div class="quick-actions">
            <b-button mode="list" size="large" @click="navigateTo('/batch-list')">
              Batch Management
            </b-button>
            <b-button mode="edit" size="large" @click="navigateTo('/users')">
              User Management
            </b-button>
            <b-button mode="excel" size="large" @click="navigateTo('/transaction-reports')">
              View Reports
            </b-button>
            <b-button mode="save" size="large" @click="navigateTo('/settings')">
              System Settings
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  UserOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue';

interface Activity {
  id: number;
  title: string;
  type: 'success' | 'warning' | 'info';
  time: string;
}

export default defineComponent({
  name: "DashboardOverview",
  components: {
    UserOutlined,
    GlobalOutlined,
    CreditCardOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined
  },
  data() {
    return {
      stats: {
        totalUsers: 1234,
        activeSessions: 89,
        dailyTransactions: 5678
      },
      recentActivities: [
        {
          id: 1,
          title: "Daily batch process completed",
          type: "success",
          time: "2024-01-15T14:30:00Z"
        },
        {
          id: 2,
          title: "New user registration",
          type: "info",
          time: "2024-01-15T13:45:00Z"
        },
        {
          id: 3,
          title: "High transaction volume detected",
          type: "warning",
          time: "2024-01-15T12:15:00Z"
        },
        {
          id: 4,
          title: "System backup completed",
          type: "success",
          time: "2024-01-15T11:00:00Z"
        },
        {
          id: 5,
          title: "User permission updated",
          type: "info",
          time: "2024-01-15T10:30:00Z"
        }
      ] as Activity[]
    };
  },
  methods: {
    formatTime(timeString: string): string {
      const date = new Date(timeString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    },
    navigateTo(path: string) {
      this.$router.push(path);
    }
  }
});
</script>

<style lang="scss" scoped>
.dashboard-overview {
  .stats-row {
    margin-bottom: 16px;
  }

  .chart-container {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mock-chart {
    width: 100%;
    max-width: 400px;
  }

  .chart-bars {
    display: flex;
    align-items: end;
    gap: 8px;
    height: 200px;
    margin-bottom: 16px;
    justify-content: space-around;
  }

  .bar {
    background: linear-gradient(135deg, #4e2a81 0%, #1890ff 100%);
    border-radius: 4px 4px 0 0;
    flex: 1;
    max-width: 40px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
      transform: scaleY(1.1);
    }
  }

  .chart-labels {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #666;
  }

  .activity-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .activity-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .activity-icon {
    margin-right: 12px;
    font-size: 16px;
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-weight: 500;
    color: #262626;
    margin-bottom: 4px;
  }

  .activity-time {
    font-size: 12px;
    color: #8c8c8c;
  }

  .quick-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    .ant-btn {
      min-width: 160px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
