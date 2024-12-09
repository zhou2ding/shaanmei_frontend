<template>
  <div class="header">
    <slot>默认标题</slot>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.header {
  width: 100%;
  height: 100px;
  background-image: url('@/assets/images/header.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header h1 {
  color: white;
  font-size: 32px;
  margin: 0;
}
</style>