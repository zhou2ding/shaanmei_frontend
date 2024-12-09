<template>
  <div class="line-chart" ref="chartContainer" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
import * as echarts from "echarts";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartContainer = ref(null);
let chartInstance = null;

const initChart = () => {
  if (!chartContainer.value) return;

  // 初始化图表
  chartInstance = echarts.init(chartContainer.value);

  // 设置图表选项
  chartInstance.setOption({
    backgroundColor: 'white',
    title: {
      text: props.data.title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: props.data.timestamps, // X轴标签
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "运价指数",
        type: "line",
        smooth: false,
        data: props.data.values, // 数据数组
        showSymbol: false,
        lineStyle: {
          color: "rgba(58, 145, 255, 0.7)", // 更柔和的线条颜色
          width: 2,
        },
        areaStyle: {
          color: 'rgba(58, 58, 58, 0.2)',
        },
      },
    ],
  });
};

onMounted(initChart);

watch(
    () => props.data,
    (newData) => {
      if (chartInstance) {
        chartInstance.setOption({
          title: {
            text: newData.title,
          },
          xAxis: {
            data: newData.timestamps,
          },
          series: [
            {
              data: newData.values,
            },
          ],
        });
      }
    },
    {deep: true}
);
</script>

<style scoped>
.line-chart {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>