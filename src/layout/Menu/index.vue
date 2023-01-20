<template>
    <el-menu active-text-color="#ffd04b" background-color="$menuGg" class="el-menu-vertical-demo"
        :default-active="defaultActive" text-color="#fff" @open="handleOpen" @close="handleClose" 
        router 
        unique-opened 
        :collapse="!$store.getters.sideType">
        <el-sub-menu :index="`${item.id}`" v-for="(item,index) in menusList" :key="item.id">
            <template #title>
                <el-icon>
                    <component :is="iconList[index]"></component>
                </el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
             :index="'/' + it.path" 
             v-for="it in item.children" 
             :key="it.id"
             @click="savePath(it.path)"
            >
            <template #title>
                <el-icon>
                    <component :is="icon"></component>
                </el-icon>
                <span>{{ it.authName }}</span>
            </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
}
const handleClose = (key, keyPath) => {
}

// 从数据库中获取列表
const menusList = ref([])
const initMenuList = async () => {
    menusList.value = await menuList()
    console.log(menusList.value)
}
initMenuList()

// 保持刷新后还能停留到上次访问的地方，path存到sessionStorage中
const defaultActive = ref(sessionStorage.getItem('path')||'/user')
const savePath = (path)=>{
    sessionStorage.setItem('path',`/${path}`)
}

// 一级图标的分配
const iconList = ref(['user','setting','shop','tickets','pie-chart'])
const icon = ref('menu')

</script>

<style lang="scss" scoped>

</style>

