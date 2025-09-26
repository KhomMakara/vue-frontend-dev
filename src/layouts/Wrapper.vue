<template>
  <a-layout class="layout-wrapper">
    <a-layout-header style="background: #fff; padding: 0 20px">
      <div class="header-content">
        <div class="breadcrumb-area">
          <a-breadcrumb>
            <a-breadcrumb-item>
              <router-link to="/">Dashboard</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="currentPageName !== 'Dashboard'">
              {{ currentPageName }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="header-actions">
          <a-select
            v-model:value="currentLanguage"
            size="large"
            style="width: 120px; margin-right: 16px"
            :options="languageOptions"
          />

          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <UserOutlined />
                  Profile
                </a-menu-item>
                <a-menu-item key="settings">
                  <SettingOutlined />
                  Settings
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                  <LogoutOutlined />
                  Logout
                </a-menu-item>
              </a-menu>
            </template>
            <a-button class="user-button">
              <UserOutlined />
              John Doe
              <DownOutlined />
            </a-button>
          </a-dropdown>

          <a-badge count="3" class="notification-badge">
            <a-button type="text" @click="showNotifications = !showNotifications">
              <BellOutlined style="font-size: 18px" />
            </a-button>
          </a-badge>
        </div>
      </div>
    </a-layout-header>

    <a-layout-content style="margin: 24px 16px; padding: 24px; background: #fff; min-height: 280px">
      <slot></slot>
    </a-layout-content>

    <!-- Notifications Drawer -->
    <a-drawer
      v-model:open="showNotifications"
      title="Notifications"
      placement="right"
      width="400"
    >
      <div class="notification-list">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
        >
          <div class="notification-icon">
            <CheckCircleOutlined v-if="notification.type === 'success'" style="color: #52c41a" />
            <ExclamationCircleOutlined v-else-if="notification.type === 'warning'" style="color: #faad14" />
            <CloseCircleOutlined v-else-if="notification.type === 'error'" style="color: #ff4d4f" />
            <InfoCircleOutlined v-else style="color: #1890ff" />
          </div>
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatTime(notification.time) }}</div>
          </div>
        </div>
      </div>
    </a-drawer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  time: string;
  read: boolean;
}

export default defineComponent({
  name: "LayoutWrapper",
  components: {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    DownOutlined,
    BellOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined
  },
  data() {
    return {
      currentLanguage: "en",
      showNotifications: false,
      languageOptions: [
        { label: "🇺🇸 English", value: "en" },
        { label: "🇰🇭 Khmer", value: "km" }
      ],
      notifications: [
        {
          id: 1,
          title: "Batch Process Complete",
          message: "Daily batch processing completed successfully with 1,234 transactions processed.",
          type: "success",
          time: "2024-01-15T14:30:00Z",
          read: false
        },
        {
          id: 2,
          title: "User Login Alert",
          message: "Multiple failed login attempts detected for user admin@example.com",
          type: "warning",
          time: "2024-01-15T13:45:00Z",
          read: false
        },
        {
          id: 3,
          title: "System Maintenance",
          message: "Scheduled maintenance will begin at 02:00 AM tomorrow.",
          type: "info",
          time: "2024-01-15T12:00:00Z",
          read: true
        },
        {
          id: 4,
          title: "Database Error",
          message: "Connection timeout error occurred during data sync process.",
          type: "error",
          time: "2024-01-15T10:15:00Z",
          read: true
        }
      ] as Notification[]
    };
  },
  computed: {
    currentPageName() {
      const routeNameMap: Record<string, string> = {
        "/": "Dashboard",
        "/users": "User List",
        "/user-roles": "User Roles",
        "/batch-list": "Batch List",
        "/batch-executor": "Batch Executor",
        "/transaction-reports": "Transaction Reports",
        "/user-activity": "User Activity",
        "/settings": "Settings"
      };
      return routeNameMap[this.$route.path] || "Dashboard";
    }
  },
  methods: {
    formatTime(timeString: string): string {
      const date = new Date(timeString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  }
});
</script>

<style lang="scss" scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.breadcrumb-area {
  flex: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-button {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 4px 12px;
}

.notification-badge {
  margin-left: 8px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-item {
  display: flex;
  padding: 12px;
  border-radius: 6px;
  background: #f5f5f5;

  &.unread {
    background: #e6f7ff;
    border-left: 3px solid #1890ff;
  }
}

.notification-icon {
  margin-right: 12px;
  font-size: 16px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #262626;
}

.notification-message {
  font-size: 14px;
  color: #595959;
  margin-bottom: 8px;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: #8c8c8c;
}
</style>
