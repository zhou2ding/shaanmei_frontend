<script setup>
import {ref, onMounted, defineEmits} from 'vue'
import {ElDatePicker, ElButton, ElSelect, ElOption} from "element-plus";

let autocomplete = null;

const emit = defineEmits(["onSearch"]);
const routeOptions = [
    {name: '短途', value: 1},
    {name: '中途', value: 2},
    {name: '长途', value: 3}
]

const selectedDate = ref(null)        //选择时间
const routeSize = ref(1)          //请选择路途

/**
 * 开始搜索
 */
function startSearch() {
    const searchParams = {
        date: selectedDate.value,
        routeSize: routeSize.value

    };
    console.log("触发查询事件:", searchParams);
    showResult.value = true
    emit("onSearch", searchParams);
}

const showResult = ref(false)

const getTime = () => {
    // 获取当前时间
    const now = new Date();

    // 将当前时间格式化为 YYYY.MM.DD 格式
    return now.toISOString().slice(0, 10).replace('-', '.');
}

const getIndex = () => {

    return getRandomNumber();
}

function getRandomNumber() {
    // 生成一个介于 0 和 1 之间的随机数
    const random = Math.random();

    // 将随机数转换为 50 到 500 之间的随机数，并保留两位小数

    return (random * (500 - 50) + 50).toFixed(2);
}


</script>

<template>
    <div class="search-criteria-normal">
        <div class="search-criteria__wrapper">
            <div class="searchTitle">运价指数查询</div>
        </div>
        <div class="search-contain">
            <div class="search-form-item">
                <el-date-picker
                    v-model="selectedDate"
                    type="datetimerange"
                    range-separator="To"
                    placeholder="选择日期"
                    class="form-date"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
            </div>
            <div class="search-form-item">
                <el-select
                    v-model="routeSize"
                    placeholder="请选择路途"
                    class="form-input"
                >
                    <el-option
                        v-for="item in routeOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button type="primary" @click="startSearch">查询</el-button>
            </div>
            <div class="result" v-if="showResult">
                <div class="shipment-costs-search-form-item" style="color: bisque">
                    {{ getTime() }}
                </div>
                <div class="shipment-costs-search-form-item" style="color: bisque">
                    今日运价指数：{{ getIndex() }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.search-criteria-normal {
    overflow: hidden;
    background-color: rgba(22, 64, 97, 0.5);
    padding: 0 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 5px solid #002545; /* 边框宽度、样式和颜色 */
    border-radius: 15px; /* 圆角边框 */

    /* 阴影 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    /* 过渡效果，使得鼠标悬停时有动画效果 */
    transition: all 0.3s ease-in-out;

    .search-criteria__wrapper {
        width: 100%;
        padding: 8px 0;

        .searchTitle {
            color: #3ad9ff;
            font-size: 24px;
        }
    }

    .search-contain {
        display: flex;
        padding-bottom: 6px;
        height: 48px;
        .search-form-item {
            margin-right: 16px;

            .form-date {
                width: 400px;
            }

            .form-input {
                width: 180px;
            }

            .unloading {
                width: 180px;
                height: 32px;
                line-height: 32px;
                color: #909399;
            }

            .unloading:focus-visible {
                outline: none;
            }
        }
        .result{
            margin-left: 12px;
        }
    }
}
</style>