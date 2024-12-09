<template>
  <div id="app">
    <AppSidebar />
    <AppTopBar />
    <div class="main-content">
      <router-view :key="Math.random()"/>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/Sidebar/Sidebar.vue';
import AppTopBar from '@/components/TopBar/TopBar.vue'

export default {
  components: {
    AppSidebar,
    AppTopBar,
  },
};
</script>

<style>
#app {
  display: flex;
}

.main-content {
  position: absolute;
  top: 50px;
  left: 200px;
  height: auto;
  min-height: calc(100% - 50px);
  width: calc(100% - 200px);
  background: url('@/assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
}
</style>