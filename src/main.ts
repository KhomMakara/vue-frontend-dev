import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// SCSS
import './assets/main.scss'

import App from './App.vue'
import router from './router'

// B-Components
import { registerBComponents } from './components/B'

// Create the app
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

// Register all B-Components globally
registerBComponents(app)

app.mount('#app')
