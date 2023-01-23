<template>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <svg-icon icon="language"></svg-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const i18n = useI18n()
const currentLanguage = computed(() => {
    return i18n.locale.value
})
const handleCommand = (val) => {
    i18n.locale.value = val
    store.commit('app/changLang', val)
    localStorage.setItem('lang', val)
}


</script>

<style>

</style>