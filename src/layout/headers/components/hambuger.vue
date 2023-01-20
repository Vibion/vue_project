<template>
    <div class="hamburger-container">
        <svg-icon :icon="icon" @click="changeSide"></svg-icon>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const changeSide = () => {
    store.commit('app/changeSide')
}
const icon = computed(() => {
    return store.getters.sideType ? "hamburger-opened" : "hamburger-closed"
})

</script>

<style lang="scss" scoped>
.hamburger-container {
    margin-right: 16px;
    box-sizing: border-box;
    cursor: pointer;
}
</style>