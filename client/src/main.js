/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import TabMenu from 'primevue/tabmenu';



const app = createApp(App)
app.use(PrimeVue)

app.component('TabMenu', TabMenu)

registerPlugins(app)

app.mount('#app')
