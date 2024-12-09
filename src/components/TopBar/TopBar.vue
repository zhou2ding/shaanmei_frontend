<template>
  <div class="topBar">
    <div class="topBar-left">陕煤平台</div>
    <div class="topBar-right">
      <span class="user-info">
        <i class="icon-user"></i> 测试
      </span>
      <button class="logout-button">退出</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '@/styles/variables/variables.module';
.topBar {
  z-index: $base-z-index+2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #3c5a99; /* 顶部栏背景色 */
  color: white; /* 字体颜色 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* 顶部栏与内容的分界线 */
}

.topBar-left {
  font-size: 18px;
  font-weight: bold;
}

.topBar-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-user {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('@/assets/images/user1.png') no-repeat center center;
  background-size: cover;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;

  &:hover {
    color: #d9534f;
  }
}
</style>