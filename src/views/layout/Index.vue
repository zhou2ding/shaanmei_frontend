<script setup>
import {RouterView } from 'vue-router'
import Header from "@/views/layout/components/Header.vue";
import SideBar from "@/views/layout/components/SideBar.vue";
</script>

<template>
    <div class="layoutIndex">
        <div class="head">
            <Header></Header>
        </div>
        <div class="container">
            <div class="menu">
                <SideBar></SideBar>
            </div>
            <div class="content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.layoutIndex{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .head{
        width: 100%;
        height: 50px;
    }
    .container{
        width: 100%;
        flex: 1;
        display: flex;
        .menu{
            width: 200px;
            height: 100%;
        }
        .content{
            flex: 1;
        }
    }
}

</style>