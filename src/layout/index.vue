<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside :width="asideWidth" class="sidebar-container">
        <Menu />
      </el-aside>

      <el-container class="container" :class="{hidderContainer: !$store.getters.sideType}">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from "./Menu";
import Header from "./headers"
import { computed } from "vue";
import { useStore } from "vuex";
// import { Variable } from "eslint-scope";

const store = useStore()
const asideWidth = computed(()=>{
  return store.getters.sideType ? '210px':'67px'
})

</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

::v-deep .el-header {
  padding: 0;
}
</style>
