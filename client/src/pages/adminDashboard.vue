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
    }
};

</script>

<style>
.tab-menu {
    list-style-type: none;
    display: flex;
    justify-content: left;
    padding: 0;
}

.tab-menu li {
    cursor: pointer;
    padding: 10px;
}

.tab-menu li.active {
    background-color: #ccc;
}

.card {
    background-color: #ccc;
}
</style>