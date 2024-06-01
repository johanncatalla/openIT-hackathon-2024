<template>
    <div>
        <ul class="tab-menu">
            <li :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">Dashboard</li>
            <li :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">Settings</li>
        </ul>

        <div v-if="activeTab === 'dashboard'">
            <div class="card flex justify-content-center">
                <Breadcrumb :home="home" :model="items" />
            </div>
            <div class="card">
                <Toast />
                <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="text/*" :maxFileSize="1000000000000">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>
        <TableViewer></TableViewer>
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
        onAdvancedUpload() {
            
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        }
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
</style>