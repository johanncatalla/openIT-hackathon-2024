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

import Button from 'primevue/button';
import Tree from 'primevue/tree';
import Breadcrumb from 'primevue/breadcrumb';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)

app.component('TabMenu', TabMenu)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Tree', Tree)
app.component('ButtonClick', Button)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Breadcrumb', Breadcrumb)
app.component('FileUpload', FileUpload)
app.component('FloatLabel', FloatLabel)
app.component('InputText', InputText)

registerPlugins(app)

app.mount('#app')
