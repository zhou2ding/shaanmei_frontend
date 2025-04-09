<script setup>

</script>

<template>
    <div class="header">
        <slot>默认标题</slot>
    </div>
</template>

<style scoped lang="less">
.header {
    width: 100%;
    height: 100px;
    background-image: url('../assets/header.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>