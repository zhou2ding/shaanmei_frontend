<script setup>
import {menuList} from "@/views/layout/components/menulist.js";
import { ref } from "vue";
import router from "@/router/index.js";

const isExpanded = ref(false);

const toggleMenu = () => {
    isExpanded.value = !isExpanded.value;
};
function routerTo(val){
    router.push(val.path)
}
</script>

<template>
    <div class="sidebar">
        <div class="menu-item">
            <div class="menu-header" @click="toggleMenu">
                <span>运价评估</span>
                <span class="arrow" :class="{ 'arrow-down': isExpanded }"></span>
            </div>
            <div class="submenu" v-if="isExpanded">
                <div v-for="item in menuList" :key="item.path" class="sidebar-link">
                    <div @click="routerTo(item)">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #456795;
    box-shadow: 0 2px 6px rgba(0, 21, 41, 0.4);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sidebar-link {
    display: block;
    padding: 15px;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
}
.sidebar-link:hover {
    color: #fff;
    background-color: #546D8D;
}

.menu-item {
    .menu-header {
        padding: 15px;
        color: #ffffff;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .arrow {
            display: inline-block;
            width: 10px;
            height: 10px;
            border: solid #ffffff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            transition: transform 0.3s;
        }

        .arrow-down {
            transform: rotate(225deg);
        }
    }

    .submenu {
        background-color: #456795;
        padding-left: 20px;

        .sidebar-link {
            padding: 10px 15px;
        }
    }
}
</style>