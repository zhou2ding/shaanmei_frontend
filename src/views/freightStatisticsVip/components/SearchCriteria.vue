<script setup>
import {ref, onMounted, defineEmits} from 'vue'
import {ElDatePicker, ElButton, ElSelect, ElOption,ElIcon} from "element-plus";

let autocomplete = null;

const emit = defineEmits(["onSearch"]);
const mineOptions = [
    {name: "西安", value: {lng: 108.948024, lat: 34.263161}},
    {name: "宝鸡", value: {lng: 107.237974, lat: 34.361979}},
    {name: "咸阳", value: {lng: 108.708991, lat: 34.329605}}
];
const carrierOptions = ["承运商A", "承运商B", "承运商C"];

const selectedDate = ref(null)        //选择时间
const selectedMine = ref([])          //请选择装货煤矿
const selectedPort = ref(null);      //请输入卸货点
const unloadingPort = ref(null);        //卸货点
const selectedCarrierType = ref([]); //请选择承运商

/**
 * 开始搜索
 */
function startSearch() {
    let posList = []
    selectedMine.value.forEach(item => {
        let index = mineOptions.findIndex(option => {
            return item === option.name
        })
        if (index > -1) {
            posList.push(mineOptions[index])
        }
    })
    const searchParams = {
        date: selectedDate.value,
        mine: posList,
        port: unloadingPort.value,
        coalType: selectedCarrierType.value,
    };
    console.log("触发查询事件:", searchParams);
    emit("onSearch", searchParams);
}

const searchInp = ref(null)
onMounted(()=>{
    const  map = new BMapGL.Map("map");
    // 初始化自动完成控件
    autocomplete = new BMapGL.Autocomplete({
        input: searchInp.value,
        location: map,
    });
    autocomplete.addEventListener("onconfirm", function (e) {
        console.log(1111,e)
        const _value = e.item.value;
        unloadingPort.value = _value
        console.log(_value)
        selectedPort.value = _value.province + _value.city + _value.district + _value.street + _value.business;
    });
})

const tipContent = ref('提示内容')

</script>

<template>
    <div class="search-criteria-vip">
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
                    ref="startPoint"
                    v-model="selectedMine"
                    placeholder="请选择装货煤矿"
                    multiple
                    filterable
                    :multiple-limit="2"
                    class="form-input"
                >
                    <el-option
                        v-for="item in mineOptions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="search-form-item">
                <input placeholder="请输入卸货点" class="unloading" ref="searchInp" v-model="selectedPort"/>
            </div>
            <div class="search-form-item">
                <el-select
                    v-model="selectedCarrierType"
                    placeholder="请选择承运商"
                    multiple
                    :multiple-limit="2"
                    class="form-input"
                >
                    <el-option
                        v-for="item in carrierOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="btn">
                <el-button type="primary" @click="startSearch">查询</el-button>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="tipContent"
                    placement="right"
                >
                    <QuestionFilled style="color:#ffffff;width: 1.5em; height: 1.5em;margin-left: 8px"> </QuestionFilled>
                </el-tooltip>
            </div>
        </div>
        <div style="display: none" id="map"></div>
    </div>
</template>

<style lang="less">
.search-criteria-vip {
    overflow: hidden;
    background-color: rgba(22, 64, 97, 0.5);
    padding:0 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 5px solid #002545;  /* 边框宽度、样式和颜色 */
    border-radius: 15px;        /* 圆角边框 */

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
        .search-form-item{
            display: flex;
            align-items: center;
            margin-right:16px;
            .form-date{
                width: 400px;
            }
            .form-input{
                width: 180px;
            }
            .unloading{
                width: 180px;
                height: 32px;
                line-height: 32px;
                color: #909399;
            }
            .unloading:focus-visible{
                outline: none;
            }
        }
        .btn{
            display: flex;
            align-items: center;
        }
    }
}
</style>