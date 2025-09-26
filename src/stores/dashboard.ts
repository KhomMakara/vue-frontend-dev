import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
}

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const users = ref<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-01-14T16:45:00Z'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '2024-01-10T09:15:00Z'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-01-15T14:20:00Z'
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Viewer',
      status: 'active',
      lastLogin: '2024-01-13T11:30:00Z'
    }
  ])

  const settings = ref({
    siteName: 'My Dashboard',
    theme: 'light',
    notifications: true,
    emailAlerts: false,
    autoSave: true,
    language: 'en'
  })

  // Getters
  const activeUsers = computed(() => users.value.filter(user => user.status === 'active'))

  const dashboardStats = computed((): DashboardStats => ({
    totalUsers: users.value.length,
    activeUsers: activeUsers.value.length,
    totalRevenue: 45680,
    monthlyGrowth: 12.5
  }))

  const recentActivities = computed(() => [
    { id: 1, action: 'User login', user: 'John Doe', time: '2 minutes ago', type: 'info' },
    { id: 2, action: 'New user registered', user: 'Sarah Connor', time: '15 minutes ago', type: 'success' },
    { id: 3, action: 'Failed login attempt', user: 'Unknown', time: '30 minutes ago', type: 'warning' },
    { id: 4, action: 'Settings updated', user: 'Admin', time: '1 hour ago', type: 'info' },
    { id: 5, action: 'User deactivated', user: 'Old User', time: '2 hours ago', type: 'error' }
  ])

  // Actions
  function addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      ...user,
      id: Math.max(...users.value.map(u => u.id)) + 1
    }
    users.value.push(newUser)
  }

  function updateUser(id: number, updatedUser: Partial<User>) {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedUser }
    }
  }

  function deleteUser(id: number) {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  function updateSettings(newSettings: Partial<typeof settings.value>) {
    settings.value = { ...settings.value, ...newSettings }
  }

  return {
    // State
    users,
    settings,

    // Getters
    activeUsers,
    dashboardStats,
    recentActivities,

    // Actions
    addUser,
    updateUser,
    deleteUser,
    updateSettings
  }
})
