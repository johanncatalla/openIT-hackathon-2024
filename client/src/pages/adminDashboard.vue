<template>
    <div>
        <ul class="tab-menu">
            <li :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">Dashboard</li>
            <li :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">Settings</li>
        </ul>

        <div v-if="activeTab === 'dashboard'">
            <div class="card flex justify-content-center">
                <Breadcrumb :home="home" :model="items" />
                <TableViewer class="table"></TableViewer>
            </div>
            
        </div>
        
        <div v-if="activeTab === 'settings'">
        </div>
    </div>
</template>

<script>
import TableViewer from './TableViewer.vue';

export default {
    data() {
        return {
            activeTab: 'dashboard',
            home: {
                icon: 'pi pi-home'
            },
            items: [
                { label: 'Home' },
                { label: 'Dashboard', to: '/Dashboard' }]
        }
    },
    components: {
        TableViewer
    },
    methods: {
    }
};

</script>

<style>

.tab-menu {
    list-style-type: none;
    display: flex;
    justify-content: left;
    padding: 0;
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.tab-menu li {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
}

.tab-menu li.active {
    background-color: #ccc;
    
}

.card {
    background-color: #ccc;
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.p-breadcrumb{
    margin-bottom: 1rem;
}
</style>