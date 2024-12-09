<template>
  <div class="sidebar">
    <div class="menu-item">
      <div class="menu-header" @click="toggleMenu">
        <span>运价评估</span>
        <span class="arrow" :class="{ 'arrow-down': isExpanded }"></span>
      </div>
      <div class="submenu" v-if="isExpanded">
        <router-link to="/shipment-costs" class="sidebar-link">运价统计-VIP</router-link>
        <router-link to="/shipment-statistics" class="sidebar-link">运价统计</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables/variables.module';

@mixin active {
  &:hover {
    color: var(--el-color-white);
    background-color: $base-menu-active;
  }

  &.is-active {
    color: var(--el-color-white);
    background-color: $base-menu-active;
  }
}

.sidebar {
  z-index: $base-z-index+1;
  overflow: hidden;
  width: $base-left-menu-width;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: $base-menu-background;
  padding-top: 50px;
  box-shadow: 0 2px 6px rgba(0, 21, 41, 0.4);
  transition: $base-transition;
  border-right: 1px solid rgba(0, 0, 0, 0.1); /* 添加右边的分界线 */
}

.sidebar-link {
  display: block;
  padding: 15px;
  color: $base-menu-color;
  text-decoration: none;
}

.menu-item {
  .menu-header {
    padding: 15px;
    color: $base-menu-color;
    font-weight: bold;
    font-size: $base-font-size-big;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow {
      display: inline-block;
      width: 10px;
      height: 10px;
      border: solid $base-menu-color;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      transition: transform 0.3s;
    }

    .arrow-down {
      transform: rotate(225deg);
    }
  }

  .submenu {
    background-color: $base-menu-background;
    padding-left: 20px;

    .sidebar-link {
      padding: 10px 15px;
    }
  }
}
</style>