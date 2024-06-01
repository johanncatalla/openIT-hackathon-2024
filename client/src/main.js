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
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'

import TabMenu from 'primevue/tabmenu';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tree from 'primevue/tree';
import Button from 'primevue/button';


const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)

app.component('TabMenu', TabMenu)
app.component('ToastMessage', Toast)
app.component('TreeView', Tree)
app.component('ButtonCLick', Button)

registerPlugins(app)

app.mount('#app')
