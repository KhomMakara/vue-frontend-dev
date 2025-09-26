<template>
  <div class="settings-view">
    <div class="settings-header">
      <h2>Settings</h2>
      <p>Manage your application preferences and configuration</p>
    </div>

    <!-- General Settings -->
    <DashboardCard title="General Settings">
      <div class="settings-section">
        <div class="form-row">
          <div class="form-group">
            <label for="siteName">Site Name</label>
            <input
              id="siteName"
              v-model="localSettings.siteName"
              type="text"
              class="form-input"
              placeholder="Enter site name"
            />
          </div>
          <div class="form-group">
            <label for="language">Language</label>
            <select id="language" v-model="localSettings.language" class="form-select">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="theme">Theme</label>
            <select id="theme" v-model="localSettings.theme" class="form-select">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- Notification Settings -->
    <DashboardCard title="Notifications">
      <div class="settings-section">
        <div class="form-group">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="localSettings.notifications"
                type="checkbox"
                class="checkbox"
              />
              <span class="checkbox-custom"></span>
              Enable push notifications
            </label>
            <p class="help-text">Receive notifications for important updates and activities</p>
          </div>
        </div>

        <div class="form-group">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="localSettings.emailAlerts"
                type="checkbox"
                class="checkbox"
              />
              <span class="checkbox-custom"></span>
              Email alerts
            </label>
            <p class="help-text">Get email notifications for critical events</p>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- System Settings -->
    <DashboardCard title="System Settings">
      <div class="settings-section">
        <div class="form-group">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="localSettings.autoSave"
                type="checkbox"
                class="checkbox"
              />
              <span class="checkbox-custom"></span>
              Auto-save changes
            </label>
            <p class="help-text">Automatically save your changes without confirmation</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="backupFrequency">Backup Frequency</label>
            <select id="backupFrequency" v-model="backupSettings.frequency" class="form-select">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>
          <div class="form-group">
            <label for="retentionPeriod">Data Retention (days)</label>
            <input
              id="retentionPeriod"
              v-model.number="backupSettings.retentionDays"
              type="number"
              class="form-input"
              min="1"
              max="365"
            />
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- Security Settings -->
    <DashboardCard title="Security">
      <div class="settings-section">
        <div class="form-row">
          <div class="form-group">
            <label for="sessionTimeout">Session Timeout (minutes)</label>
            <input
              id="sessionTimeout"
              v-model.number="securitySettings.sessionTimeout"
              type="number"
              class="form-input"
              min="5"
              max="480"
            />
          </div>
          <div class="form-group">
            <label for="maxLoginAttempts">Max Login Attempts</label>
            <input
              id="maxLoginAttempts"
              v-model.number="securitySettings.maxLoginAttempts"
              type="number"
              class="form-input"
              min="1"
              max="10"
            />
          </div>
        </div>

        <div class="form-group">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="securitySettings.twoFactorAuth"
                type="checkbox"
                class="checkbox"
              />
              <span class="checkbox-custom"></span>
              Enable Two-Factor Authentication
            </label>
            <p class="help-text">Add an extra layer of security to your account</p>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- API Settings -->
    <DashboardCard title="API Configuration">
      <div class="settings-section">
        <div class="form-group">
          <label for="apiKey">API Key</label>
          <div class="input-group">
            <input
              id="apiKey"
              :value="maskedApiKey"
              type="text"
              class="form-input"
              readonly
            />
            <button @click="generateApiKey" class="btn-secondary">Regenerate</button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="rateLimit">Rate Limit (requests/minute)</label>
            <input
              id="rateLimit"
              v-model.number="apiSettings.rateLimit"
              type="number"
              class="form-input"
              min="1"
              max="1000"
            />
          </div>
          <div class="form-group">
            <label for="apiVersion">API Version</label>
            <select id="apiVersion" v-model="apiSettings.version" class="form-select">
              <option value="v1">Version 1.0</option>
              <option value="v2">Version 2.0</option>
              <option value="v3">Version 3.0 (Beta)</option>
            </select>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- Action Buttons -->
    <div class="settings-actions">
      <button @click="resetSettings" class="btn-secondary">Reset to Defaults</button>
      <button @click="exportSettings" class="btn-secondary">Export Settings</button>
      <button @click="saveSettings" class="btn-primary">Save Changes</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import DashboardCard from '@/components/DashboardCard.vue'

const store = useDashboardStore()

// Local settings that mirror the store
const localSettings = reactive({
  siteName: '',
  theme: 'light',
  notifications: true,
  emailAlerts: false,
  autoSave: true,
  language: 'en'
})

// Additional settings not in the main store
const backupSettings = reactive({
  frequency: 'weekly',
  retentionDays: 30
})

const securitySettings = reactive({
  sessionTimeout: 60,
  maxLoginAttempts: 5,
  twoFactorAuth: false
})

const apiSettings = reactive({
  key: 'sk-1234567890abcdef',
  rateLimit: 100,
  version: 'v2'
})

// Computed
const maskedApiKey = computed(() => {
  const key = apiSettings.key
  return key.slice(0, 8) + '*'.repeat(key.length - 12) + key.slice(-4)
})

// Methods
const loadSettings = () => {
  // Load from store
  Object.assign(localSettings, store.settings)
}

const saveSettings = () => {
  store.updateSettings(localSettings)
  alert('Settings saved successfully!')
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    localSettings.siteName = 'My Dashboard'
    localSettings.theme = 'light'
    localSettings.notifications = true
    localSettings.emailAlerts = false
    localSettings.autoSave = true
    localSettings.language = 'en'

    backupSettings.frequency = 'weekly'
    backupSettings.retentionDays = 30

    securitySettings.sessionTimeout = 60
    securitySettings.maxLoginAttempts = 5
    securitySettings.twoFactorAuth = false

    apiSettings.rateLimit = 100
    apiSettings.version = 'v2'

    alert('Settings reset to defaults')
  }
}

const generateApiKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = 'sk-'
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  apiSettings.key = result
  alert('New API key generated')
}

const exportSettings = () => {
  const settingsData = {
    general: localSettings,
    backup: backupSettings,
    security: securitySettings,
    api: apiSettings
  }

  const dataStr = JSON.stringify(settingsData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = 'dashboard-settings.json'
  link.click()
}

// Load settings on component mount
onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-header h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.settings-header p {
  margin: 0;
  color: #666;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group .form-input {
  flex: 1;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
}

.checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  background: white;
  position: relative;
  transition: all 0.2s;
}

.checkbox:checked + .checkbox-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.checkbox:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.help-text {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 1px solid #e9ecef;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e9ecef;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

.input-group .btn-secondary {
  padding: 0.75rem 1rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .settings-actions {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .settings-actions button {
    width: 100%;
  }

  .input-group {
    flex-direction: column;
  }

  .input-group .btn-secondary {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .settings-view {
    gap: 1.5rem;
  }

  .form-input,
  .form-select {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
}
</style>
