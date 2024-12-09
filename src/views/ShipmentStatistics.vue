<template>
  <div class="shipment-statistics">
    <Header>
      <h1>运价统计</h1>
    </Header>
    <!-- 页面内容模块 -->
    <div class="page-content">
      <div class="top-content content-tiem">
        <!-- 查询部分 -->
        <div class="search inline">
          <Search @onSearch="handleSearch"  :vip="false"/>
        </div>
        
        <!-- 折线图部分 -->
        <div class="chart-container inline">
          <div class="rect lt"></div>
          <div class="rect rt"></div>
          <div class="rect lb"></div>
          <div class="rect rb"></div>
          <!-- 折线图部分 -->
          <div class="chart-data" v-if="chartVisible">
            <line-chart :data="chartData"/>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="price-content inline">
          <MapRoute class="inline" :vip="false" />
          <MapIndex class="inline" :vip="false" />
        </div>

      </div>
      <div class="bottom-content content-tiem">
        <!-- 承运商 排名 -->
        <div class="order inline">
          <BarChart class="inline" title="承运商运价排名" :data="barData" />
          <BarChart class="inline" title="承运商运量排名" :data="barData" />
        </div>
        <!-- 指数表单 -->
        <div class="table inline">
          <TableForm title="各线路运价指数" :data="tableData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted,  ref } from 'vue';

import Search from "@/components/Search/index.vue";
import LineChart from "@/components/LineChart/index.vue";
import Header from '@/components/Header/Header.vue';
import MapRoute from "@/components/RoutePrice/index.vue";
import MapIndex from "@/components/PriceIndex/index.vue";
import BarChart from "@/components/BarChart/index.vue";
import TableForm from '@/components/TableForm/index.vue';


onMounted(() => {
    // 在组件挂载到 DOM 后执行的操作
    handleSearch()
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

const barData = ref([ // 条形图数据数组，可以根据需要修改为实际数据。这里使用示例数据。
  { name: '1', value: 21 }, // 每个对象表示一个条形图条形，包含名称和值。名称对应Y轴标签，值对应条形高度。可以根据需要修改为实际数据。这里使用示例数据。
  { name: '2', value: 23 }, // ...
  { name: '3', value: 60 }, // ...
  { name: '4', value: 53 }, // 每个对象表示一个条形图条形，包含名称和值。名称对应Y轴标签，值对应条形高度。可以根据需要修改为实际数据。这里使用示例数据。
  { name: '5', value: 42 }, // ...
  { name: '6', value: 60 }, // ...
  { name: '7', value: 1 }, // 每个对象表示一个条形图条形，包含名称和值。名称对应Y轴标签，值对应条形高度。可以根据需要修改为实际数据。这里使用示例数据。
  { name: '8', value: 74 }, // ...
  { name: '9', value: 45 }, // ...
]);

const heatmapData = ref([
]);

const tableData = ref([
  { route: '线路A', previous: '1405.22', current: '1366.40', change: '-2.8' },
  { route: '线路B', previous: '863.98', current: '865.35', change: '0.2' },
  { route: '线路C', previous: '1992.69', current: '1864.77', change: '-6.4' },
  { route: '线路D', previous: '1213.64', current: '1228.09', change: '1.2' },
  { route: '线路E', previous: '1184.11', current: '1177.35', change: '-0.6' },
  { route: '线路F', previous: '925.99', current: '934.54', change: '0.9' },
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