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
            <div class="card flex justify-content-center">
                <Toast />
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept=".txt,.xml,.json" :maxFileSize="100000000" @upload="onUpload" :auto="true" chooseLabel="Browse" />
            </div>
        </div>

        <div v-if="activeTab === 'settings'">
        </div>
    </div>
</template>

<script>

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
    methods: {
        onUpload() {
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