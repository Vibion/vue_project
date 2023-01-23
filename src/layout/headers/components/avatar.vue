<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <div class="block">
                <el-avatar shape="square" :size="50" :src="squareUrl" />
            </div>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';

const squareUrl =
    ref("https://ts1.cn.mm.bing.net/th?id=OIP-C.dD1idq2wwb8izj7vEOVGiwAAAA&w=100&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2")
const store = useStore()
const handleLogout = () => {
    store.dispatch('app/logout')
}
</script>

<style>

</style>