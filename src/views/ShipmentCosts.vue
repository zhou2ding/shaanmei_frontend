<template>
  <div class="shipment-costs">
    <Header>
      <h1>运价统计</h1>
    </Header>
    <!-- 页面内容模块 -->
    <div class="page-content">
      <div class="top-content content-tiem">
        <!-- 查询部分 -->
        <div class="search inline">
          <Search @onSearch="handleSearch"/>
        </div>
        
        <!-- 折线图部分 -->
        <div class="chart-container inline">
          <div class="rect lt"></div>
          <div class="rect rt"></div>
          <div class="rect lb"></div>
          <div class="rect rb"></div>
          <el-button-group class="chart-options">
            <el-button
                v-for="option in chartOptions"
                :key="option"
                @click="changeChart(option)"
                :type="currentChart === option ? 'primary' : 'default'"
            >
              {{ option }}
            </el-button>
          </el-button-group>
          <!-- 折线图部分 -->
          <div class="chart-data" v-if="chartVisible">
            <line-chart :data="chartData"/>
          </div>
        </div>
        <!-- 价格折线图模块 -->
        <div class="price-content inline">
          <MapRoute class="inline" />
          <MapIndex class="inline" />
        </div>

      </div>
      <div class="bottom-content content-tiem">
        <!-- 雷达图部分 -->
        <div class="radar inline">
          <div class="row inline">
            <RadarChart :title="radarData1[0].name" :data="radarData1" />
            <RadarChart :title="radarData2[0].name" :data="radarData2" />
          </div>
          
          <div class="row inline">
            <RadarChart :title="radarData3[0].name" :data="radarData3" />
            <RadarChart :title="radarData4[0].name" :data="radarData4" />
          </div>
          
        </div>
        <!-- 热力图部分 -->
        <div class="hot-map inline">
          <HeatMapChart title="收货省份" :data="heatmapData" class="inline" />
          <HeatMapChart title="承运商" :data="heatmapData" class="inline" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted,  ref } from 'vue';

import Search from "@/components/Search/index.vue";
import LineChart from "@/components/LineChart/index.vue";
import {ElButtonGroup, ElButton} from "element-plus";
import Header from '@/components/Header/Header.vue';
import MapRoute from "@/components/RoutePrice/index.vue";
import MapIndex from "@/components/PriceIndex/index.vue";
import RadarChart from "@/components/RadarChart/index.vue";
import HeatMapChart from "@/components/HeatMapChart/index.vue";

onMounted(() => {
    // 在组件挂载到 DOM 后执行的操作
    handleSearch()
    heatmapData.value = generateHeatmapData()
    console.log('heatmapData', heatmapData.value)
});
const chartData = ref(null); // 当前折线图数据
const chartOptions = ["综合", "矿区", "煤种"]; // 按钮选项
const currentChart = ref("综合"); // 当前选择的折线图类型
const chartVisible = ref(false); // 控制折线图是否显示

// 雷达图属性
const radarData1 = ref([
  {
    name: '承运商平均运输单价',
    value: [120, 110, 135, 140, 125],
    indicators: ["承运商A", "承运商B", "承运商C", "承运商D", "承运商E"],
  },
  // 可以添加更多系列数据
]);

const radarData2 = ref([
  {
    name: '承运商平均运输单价',
    value: [120, 110, 135, 140, 125],
    indicators: ["承运商A", "承运商B", "承运商C", "承运商D", "承运商E"],
  },
  // 可以添加更多系列数据
]);
const radarData3 = ref([
  {
    name: "线路平均运输单价",
    indicators: ["线路1", "线路2", "线路3", "线路4", "线路5"],
    value: [100, 95, 110, 105, 120]
  }
  // 可以添加更多系列数据
]);
const radarData4 = ref([
  {
    name: '承运商平均运输单价',
    value: [120, 110, 135, 140, 125],
    indicators: ["承运商A", "承运商B", "承运商C", "承运商D", "承运商E"],
  },
  // 可以添加更多系列数据
]);

const heatmapData = ref([
]);

const handleSearch = (searchParams) => {
  console.log("查询参数:", searchParams);
  chartVisible.value = true;

  // 根据查询条件请求数据，这里模拟一个数据结果
  chartData.value = generateMockData(); // 用模拟数据替代实际请求
};

const changeChart = (option) => {
  currentChart.value = option;

  // 根据选项更新数据逻辑
  console.log(`切换到 ${option} 折线图`);
  chartData.value = generateMockData(option); // 替代为根据选项加载不同数据
};

const generateMockData = (type = "综合") => {
  const now = new Date();
  const timestamps = Array.from({length: 60}, (_, idx) => {
    const time = new Date(now - idx * 60000); // 每分钟往前推
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;
  }).reverse();

  return {
    title: `${type}运价指数时序图`,
    timestamps, // 横轴时间数据
    values: Array.from({length: 60}, () => Math.random() * 100), // 随机数据
  };
};

const getRandomInt = (min, max) => {
  // 使用 Math.random() 生成一个介于 0 和 1 之间的随机数
  // 然后乘以 (max - min + 1) 得到一个介于 0 和 (max - min + 1) 之间的随机数
  // 最后加上 min 得到一个介于 min 和 max 之间的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const generateHeatmapData = () => {
  const data = [];
  const categories = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const subcategories = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // 生成 9 行数据
  for (let i = 0; i < 9; i++) {
    const row = [];

    // 生成 9 列数据
    for (let j = 0; j < 9; j++) {
      // 生成一个随机的 category 和 subcategories
      const category = categories[j];
      const subcategoriesList = subcategories
      // 生成一个随机值，范围在 0 到 100 之间
      const value = Math.floor(Math.random() * 101);
      row.push({ category, subcategories: subcategoriesList, value });
    }

    data.push(row);
  }

  return data;
}

</script>

<style scoped>
.page-content {
  .content-tiem {
    width: 100%;
    height: auto;
    padding: 16px;
  }

  .inline {
    display: inline-block;
    vertical-align: top;
    margin: 0 16px;
  }

  .top-content {
    .chart-container {
      border: 1px solid #0079fe;
      position: relative;
      background-color: rgba(255, 255, 255, 0.05);
      width: 500px;
      height: auto;
      /* position: relative; */
      padding: 16px;
      .rect {
        width: 20px;
        height: 20px;
        position: absolute;
        border-top: 4px solid #5fbfff;
        border-left: 4px solid #5fbfff;

        &.lt {
          left: -2px;
          top: -2px;
        }

        &.rt {
          top: -2px;
          right: -2px;
          transform: rotate(90deg);
        }

        &.lb {
          bottom: -2px;
          left: -2px;
          transform: rotate(-90deg);
        }

        &.rb {
          bottom: -2px;
          right: -2px;
          transform: rotate(180deg);
        }
      }
    }

  }

  .bottom-content {
    margin-top: 36px;
  }

}


.chart-options {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.chart-data {
  margin-top: 10px;
  padding: 0;
}
</style>