<template>
    <div class="shipment-costs-search-container">
      <div class="shipment-costs-search-form-wrapper">
        <h2 class="shipment-costs-search-form-title">运价指数查询</h2>
        <div class="shipment-costs-search-form-item" v-show="vip">
          <el-config-provider :locale="zhCn">
            <el-date-picker
                v-model="selectedDate"
                type="date"
                placeholder="选择日期"
                class="form-input"
                :locale="zhCn"
            />
          </el-config-provider>
        </div>
        <div class="shipment-costs-search-form-item" v-show="vip">
          <Multiselect
              v-model="selectedMine"
              :options="mineOptions"
              size="mini"
              placeholder="请输入装货煤矿"
              :searchable="true"
              :allow-empty="false"
              class="form-input"
          />
        </div>
        <div class="shipment-costs-search-form-item" v-show="vip">
          <Multiselect
              v-model="selectedPort"
              :options="portOptions"
              placeholder="请输入卸货点"
              :searchable="true"
              :allow-empty="false"
              class="form-input"
              popper-class=""
          />
        </div>
        <div class="shipment-costs-search-form-item" v-show="vip">
          <Multiselect
              v-model="selectedCoalType"
              :options="coalTypeOptions"
              placeholder="请输入煤种种类"
              :searchable="true"
              :allow-empty="false"
              class="form-input"
              popper-class="custom-popper"
          />
        </div>
        <div class="shipment-costs-search-form-item" v-show="vip">
          <el-button type="primary" class="form-button" @click="emitSearch">查询</el-button>
        </div>

        <div class="shipment-costs-search-form-item" style="color: bisque; " v-show="!vip">
          {{ getTime() }}
        </div>
        <div class="shipment-costs-search-form-item" style="color: bisque; padding-bottom: 180px;" v-show="!vip">
          今日运价指数：{{ getIndex() }}
        </div>
      </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import "@vueform/multiselect/themes/default.scss";
import "element-plus/dist/index.css";
import {ElDatePicker, ElButton, ElConfigProvider} from "element-plus";
import Multiselect from "@vueform/multiselect";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 接收 prop 数据
const props = defineProps({
  vip: {
      type: Boolean,
      default: true
  }
});

const selectedDate = ref(null);
const selectedMine = ref(null);
const selectedPort = ref(null);
const selectedCoalType = ref(null);
const emit = defineEmits(["onSearch"]);

const mineOptions = ["煤矿A", "煤矿B", "煤矿C"];
const portOptions = ["卸货点A", "卸货点B", "卸货点C"];
const coalTypeOptions = ["煤种A", "煤种B", "煤种C"];

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
  const result = (random * (500 - 50) + 50).toFixed(2);
  
  return result;
}



const emitSearch = () => {
  const searchParams = {
    date: selectedDate.value,
    mine: selectedMine.value,
    port: selectedPort.value,
    coalType: selectedCoalType.value,
  };
  console.log("触发查询事件:", searchParams);
  emit("onSearch", searchParams);
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables/variables.module';
.shipment-costs-search-container {
  overflow: hidden;
  background-image: url('@/assets/images/card.png');
  background-size: 100% 100%;
  // top: 90px;
  padding: 24px 36px 8px;
  display: inline-block;
  width: 300px;
}

.shipment-costs-search-form-title {
  color: #3ad9ff;
  font-size: 24px;
}

.shipment-costs-search-form-wrapper {
  width: 100%;
}

.shipment-costs-search-form-item {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
}

.form-input {
  width: 100%;
}

.form-button {
  width: 100%;
}

</style>