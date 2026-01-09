import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import './assets/css/fonts.css'
import './assets/css/global.css'
app.use(router)

app.mount('#app')
