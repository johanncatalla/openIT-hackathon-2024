<template>
    <div>
        <ul class="tab-menu">
            <li :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">Dashboard</li>
            
        </ul>

        <div v-if="activeTab === 'dashboard'">
            
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'dashboard'
        };
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
</style>