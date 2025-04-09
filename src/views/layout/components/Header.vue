<script setup>

</script>

<template>
    <div class="headerIndex">
        <div class="left">运价指数平台</div>
        <div class="right">
            <div class="icon">
                <i class="icon-user"></i>测试
            </div>
            <div class="logout">退出</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.headerIndex {
    width: 100%;
    height: 50px;
    background-color: #3c5a99;
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;

    .left {
        font-size: 18px;
        font-weight: bold;
    }

    .right {
        display: flex;
        align-items: center;
        gap: 15px;
        .icon {
            display: flex;
            align-items: center;
            gap: 5px;

            .icon-user {
                display: inline-block;
                width: 30px;
                height: 30px;
                background: url('../../../assets/user.png') no-repeat center center;
                background-size: cover;
            }
        }
        .logout{
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
    }
}
</style>